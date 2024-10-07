import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Answer, AnswerDocument } from './answer.model';

@Injectable()
export class AnswerService {
  constructor(@InjectModel(Answer.name) private answerModel: Model<AnswerDocument>) {}

  async findAll(): Promise<Answer[]> {
    return this.answerModel.find().exec();
  }

  async saveAnswer(sessionId: string, question: string, answer: string): Promise<Answer> {
    const newAnswer = new this.answerModel({ sessionId, question, answer });
    return newAnswer.save();
  }
}
