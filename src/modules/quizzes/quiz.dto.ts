import {
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
  IsNotEmpty,
  IsEnum,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import {
  Quiz as QuizEntity,
  QuizQuestion,
} from "@/database/entities/quiz.entity";
import { type OmitDbFields } from "@/types";

export type Quiz = OmitDbFields<QuizEntity>;

export class QuizChoiceDTO {
  @IsOptional()
  @IsEnum(["a", "b", "c", "d"])
  choice?: "a" | "b" | "c" | "d";
}

export class QuizQuestionDTO implements QuizQuestion {
  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNotEmpty()
  @IsEnum(["enumeration", "multiple_choices"])
  type: "enumeration" | "multiple_choices";

  @IsNotEmpty()
  @IsString()
  correct_answer: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuizChoiceDTO)
  choices?: QuizChoiceDTO[];
}

export class QuizDataDTO implements Quiz {
  @IsNotEmpty()
  @IsNumber()
  instructor_id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuizQuestionDTO)
  questions: QuizQuestionDTO[];
}

export class UpdateQuizDataDTO {
  @IsOptional()
  @IsNumber()
  instructor_id?: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuizQuestionDTO)
  questions?: QuizQuestionDTO[];
}
