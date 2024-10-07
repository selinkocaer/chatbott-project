import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnswerModule } from './answer/answer.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/chatbot'),
    AnswerModule,
  ],
})
export class AppModule {}
