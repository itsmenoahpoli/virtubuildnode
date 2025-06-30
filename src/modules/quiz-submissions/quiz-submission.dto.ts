import {
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
  IsNotEmpty,
  IsBoolean,
  ValidateNested,
  IsDateString,
} from "class-validator";
import { Type } from "class-transformer";
import {
  QuizSubmission as QuizSubmissionEntity,
  QuizAnswer,
} from "@/database/entities/quiz-submission.entity";
import { type OmitDbFields } from "@/types";

export type QuizSubmission = OmitDbFields<QuizSubmissionEntity>;

export class QuizAnswerDTO implements QuizAnswer {
  @IsNotEmpty()
  @IsNumber()
  question_index: number;

  @IsNotEmpty()
  @IsString()
  student_answer: string;

  @IsNotEmpty()
  @IsBoolean()
  is_correct: boolean;
}

export class QuizSubmissionDataDTO {
  @IsNotEmpty()
  @IsNumber()
  student_id: number;

  @IsNotEmpty()
  @IsNumber()
  quiz_id: number;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuizAnswerDTO)
  answers: QuizAnswerDTO[];

  @IsNotEmpty()
  @IsNumber()
  score: number;

  @IsOptional()
  @IsBoolean()
  is_submitted: boolean;

  @IsOptional()
  @IsDateString()
  submitted_at?: string;
}

export class UpdateQuizSubmissionDataDTO {
  @IsOptional()
  @IsNumber()
  student_id?: number;

  @IsOptional()
  @IsNumber()
  quiz_id?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuizAnswerDTO)
  answers?: QuizAnswerDTO[];

  @IsOptional()
  @IsNumber()
  score?: number;

  @IsOptional()
  @IsBoolean()
  is_submitted?: boolean;

  @IsOptional()
  @IsDateString()
  submitted_at?: string;
}

export class SubmitQuizDTO {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuizAnswerDTO)
  answers: QuizAnswerDTO[];
}
