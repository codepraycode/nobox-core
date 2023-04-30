import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { CustomLogger as Logger } from '@/logger/logger.service';
import { throwJWTError } from '@/utils/exceptions';
import { verifyJWTToken } from '@/utils/jwt';
import { UserService } from '@/user/user.service';
import { createUuid } from '@/utils';

@Injectable()
export class GraphqlJwtAuthGuard implements CanActivate {
    constructor(
        private userService: UserService,
        private logger: Logger
    ) {
    }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const { req } = ctx.getContext();

        const authorization = req.headers.authorization;
        if (!authorization) {
            throwJWTError("UnAuthorized");
            return false;
        }

        const { userDetails } = verifyJWTToken(authorization) as any;

        this.logger.debug(JSON.stringify(userDetails), "");


        const user = await this.userService.getUserDetails({ email: userDetails.email });

        if (!user) {
            this.logger.debug("User not found", "GraphqlJwtAuthGuard");
            throwJWTError("UnAuthorized");
        }

        req.user = userDetails;

        return true;
    }
}