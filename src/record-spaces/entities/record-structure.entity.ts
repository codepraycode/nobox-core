import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { RecordStructureType } from '../dto/record-structure-type.enum';

@InputType("RecordStructureInput")
@ObjectType("RecordStructureObject")
export class RecordStructure {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  slug: string;

  @Field(() => RecordStructureType)
  type: RecordStructureType;

  @Field({ nullable: true })
  required?: boolean;

  @Field({ nullable: true })
  unique?: boolean;

  @Field({ nullable: true })
  hashed?: boolean;
}
