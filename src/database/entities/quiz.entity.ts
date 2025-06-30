import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { DateFieldsEntity } from "./shared.entity";

export interface QuizQuestion {
  question: string;
  type: "enumeration" | "multiple_choices";
  correct_answer: string;
  choices?: { choice?: "a" | "b" | "c" | "d" }[];
}

@Entity()
export class Quiz extends DateFieldsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  instructor_id: number;

  @Column()
  title: string;

  @Column({
    type: "text",
  })
  description: string;

  @Column({
    type: "json",
  })
  questions: QuizQuestion[];
}
