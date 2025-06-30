import { Quiz } from "./quiz.dto";
import { QuizzesRepository } from "./quizzes.repository";

export class QuizzesService {
  private quizzesRepository: QuizzesRepository;

  constructor() {
    this.quizzesRepository = new QuizzesRepository();
  }

  public async createQuiz(data: Quiz): Promise<Quiz> {
    const quiz = await this.quizzesRepository.create(data);
    return quiz;
  }

  public async getAllQuizzes(filters: {
    withDeleted: boolean;
  }): Promise<Quiz[]> {
    const quizzes = await this.quizzesRepository.findAll(filters);
    return quizzes;
  }

  public async getQuizzesByInstructorId(
    instructorId: number,
    filters: { withDeleted: boolean } = { withDeleted: false }
  ): Promise<Quiz[]> {
    const quizzes = await this.quizzesRepository.findByInstructorId(
      instructorId,
      filters
    );
    return quizzes;
  }

  public async getQuizById(id: number): Promise<Quiz | null> {
    const quiz = await this.quizzesRepository.findById(id);
    return quiz;
  }

  public async updateQuiz(
    id: number,
    data: Partial<Quiz>
  ): Promise<Quiz | null> {
    const quiz = await this.quizzesRepository.update(id, data);
    return quiz;
  }

  public async deleteQuiz(id: number): Promise<boolean> {
    return this.quizzesRepository.delete(id);
  }
}
