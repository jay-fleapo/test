import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => String, { nullable: true })
  aboutArtist?: string;

  @Field(() => String, { nullable: true })
  shopBannerImage?: string;

  @Field(() => String, { nullable: true })
  aboutStore?: string;

  @Field(() => String, { nullable: true })
  profileImage?: string;
}
