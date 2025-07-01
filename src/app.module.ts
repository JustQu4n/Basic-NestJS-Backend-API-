import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://devquan:anhquan.0110@cluster0.6j8ikm2.mongodb.net/nestjs-api?retryWrites=true&w=majority&appName=Cluster0'),
    UsersModule,
    AuthModule
  ]
})
export class AppModule {}
