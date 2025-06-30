import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { DateFieldsEntity } from "./shared.entity";

export interface QuizAnswer {
  question_index: number;
  student_answer: string;
  is_correct: boolean;
}

@Entity()
export class QuizSubmission extends DateFieldsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  student_id: number;

  @Column()
  quiz_id: number;

  @Column({
    type: "json",
  })
  answers: QuizAnswer[];

  @Column({
    type: "decimal",
    precision: 5,
    scale: 2,
  })
  score: number;

  @Column({
    type: "boolean",
    default: false,
  })
  is_submitted: boolean;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  submitted_at?: Date;
}
