import { Body, Controller, Get, Post } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { Answer } from './answer.model';

@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Get()
  async findAll(): Promise<Answer[]> {
    return this.answerService.findAll();
  }

  @Post()
  async saveAnswer(@Body() answerData: { sessionId: string; question: string; answer: string }): Promise<Answer> {
    return this.answerService.saveAnswer(answerData.sessionId, answerData.question, answerData.answer);
  }
}
