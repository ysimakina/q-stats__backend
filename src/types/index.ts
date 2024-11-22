import { AnswerCreactionAttrs } from '../answers/entities/answer.entity';

export interface AnswerWithCopiedFlag extends AnswerCreactionAttrs {
  isCopiedQuestion: boolean;
}
