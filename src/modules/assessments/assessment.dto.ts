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
  Assessment as AssessmentEntity,
  AssessmentQuestion,
} from "@/database/entities/assessment.entity";
import { type OmitDbFields } from "@/types";

export type Assessment = OmitDbFields<AssessmentEntity>;

export class AssessmentChoiceDTO {
  @IsOptional()
  @IsEnum(["a", "b", "c", "d"])
  choice?: "a" | "b" | "c" | "d";
}

export class AssessmentQuestionDTO implements AssessmentQuestion {
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
  @Type(() => AssessmentChoiceDTO)
  choices?: AssessmentChoiceDTO[];
}

export class AssessmentDataDTO implements Assessment {
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
  @Type(() => AssessmentQuestionDTO)
  questions: AssessmentQuestionDTO[];
}

export class UpdateAssessmentDataDTO {
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
  @Type(() => AssessmentQuestionDTO)
  questions?: AssessmentQuestionDTO[];
}
