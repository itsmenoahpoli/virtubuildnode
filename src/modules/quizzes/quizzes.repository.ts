import { BaseRepository } from "@/modules/base.repository";
import { quizzesRepository, QuizEntity } from "@/database";
import { Quiz } from "./quiz.dto";

export class QuizzesRepository extends BaseRepository {
  public async findAll(filters: {
    withDeleted: boolean;
  }): Promise<QuizEntity[]> {
    const queryBuilder = quizzesRepository.createQueryBuilder("quiz");

    if (filters.withDeleted) {
      queryBuilder.withDeleted();
    }

    return queryBuilder.getMany();
  }

  public async findByInstructorId(
    instructorId: number,
    filters: { withDeleted: boolean } = { withDeleted: false }
  ): Promise<QuizEntity[]> {
    const queryBuilder = quizzesRepository
      .createQueryBuilder("quiz")
      .where("quiz.instructor_id = :instructorId", { instructorId });

    if (filters.withDeleted) {
      queryBuilder.withDeleted();
    }

    return queryBuilder.getMany();
  }

  public async findById(
    id: number,
    filters: { withDeleted: boolean } = { withDeleted: false }
  ): Promise<QuizEntity | null> {
    const queryBuilder = quizzesRepository
      .createQueryBuilder("quiz")
      .where("quiz.id = :id", { id });

    if (filters.withDeleted) {
      queryBuilder.withDeleted();
    }

    return queryBuilder.getOne();
  }

  public async create(data: Quiz): Promise<QuizEntity> {
    const quiz = quizzesRepository.create(data);
    return quizzesRepository.save(quiz);
  }

  public async update(
    id: number,
    data: Partial<Quiz>
  ): Promise<QuizEntity | null> {
    const quiz = await this.findById(id);
    if (!quiz) return null;

    Object.assign(quiz, data);
    return quizzesRepository.save(quiz);
  }

  public async delete(id: number): Promise<boolean> {
    const quiz = await this.findById(id);
    if (!quiz) return false;

    await quizzesRepository.softDelete(id);
    return true;
  }
}
