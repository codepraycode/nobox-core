import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { RecordSpacesModule } from '@/record-spaces/record-spaces.module';
import { RecordsModule } from '@/records/records.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EpController } from './ep.controller';
import { EpService } from './ep.service';

@Module({
    imports: [RecordSpacesModule, RecordsModule],
    providers: [EpService],
    controllers: [EpController],
})

export class EpModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {

        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                EpController
            );
    }
}

