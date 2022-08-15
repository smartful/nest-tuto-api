import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import config from './config/keys';

@Module({
  imports: [AuthModule, UserModule, BookmarkModule, MongooseModule.forRoot(config.MONGO_URI)],
})
export class AppModule {}
