import { BaseRepository } from "@/modules/base.repository";
import { quizSubmissionsRepository, QuizSubmissionEntity } from "@/database";
import { QuizSubmission } from "./quiz-submission.dto";

export class QuizSubmissionsRepository extends BaseRepository {
  public async findAll(filters: {
    withDeleted: boolean;
  }): Promise<QuizSubmissionEntity[]> {
    const queryBuilder =
      quizSubmissionsRepository.createQueryBuilder("submission");

    if (filters.withDeleted) {
      queryBuilder.withDeleted();
    }

    return queryBuilder.getMany();
  }

  public async findByStudentId(
    studentId: number,
    filters: { withDeleted: boolean } = { withDeleted: false }
  ): Promise<QuizSubmissionEntity[]> {
    const queryBuilder = quizSubmissionsRepository
      .createQueryBuilder("submission")
      .where("submission.student_id = :studentId", { studentId });

    if (filters.withDeleted) {
      queryBuilder.withDeleted();
    }

    return queryBuilder.getMany();
  }

  public async findByQuizId(
    quizId: number,
    filters: { withDeleted: boolean } = { withDeleted: false }
  ): Promise<QuizSubmissionEntity[]> {
    const queryBuilder = quizSubmissionsRepository
      .createQueryBuilder("submission")
      .where("submission.quiz_id = :quizId", { quizId });

    if (filters.withDeleted) {
      queryBuilder.withDeleted();
    }

    return queryBuilder.getMany();
  }

  public async findByStudentAndQuiz(
    studentId: number,
    quizId: number,
    filters: { withDeleted: boolean } = { withDeleted: false }
  ): Promise<QuizSubmissionEntity | null> {
    const queryBuilder = quizSubmissionsRepository
      .createQueryBuilder("submission")
      .where("submission.student_id = :studentId", { studentId })
      .andWhere("submission.quiz_id = :quizId", { quizId });

    if (filters.withDeleted) {
      queryBuilder.withDeleted();
    }

    return queryBuilder.getOne();
  }

  public async findById(
    id: number,
    filters: { withDeleted: boolean } = { withDeleted: false }
  ): Promise<QuizSubmissionEntity | null> {
    const queryBuilder = quizSubmissionsRepository
      .createQueryBuilder("submission")
      .where("submission.id = :id", { id });

    if (filters.withDeleted) {
      queryBuilder.withDeleted();
    }

    return queryBuilder.getOne();
  }

  public async create(data: QuizSubmission): Promise<QuizSubmissionEntity> {
    const submission = quizSubmissionsRepository.create(data);
    return quizSubmissionsRepository.save(submission);
  }

  public async update(
    id: number,
    data: Partial<QuizSubmission>
  ): Promise<QuizSubmissionEntity | null> {
    const submission = await this.findById(id);
    if (!submission) return null;

    Object.assign(submission, data);
    return quizSubmissionsRepository.save(submission);
  }

  public async delete(id: number): Promise<boolean> {
    const submission = await this.findById(id);
    if (!submission) return false;

    await quizSubmissionsRepository.softDelete(id);
    return true;
  }
}
