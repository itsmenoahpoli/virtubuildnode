import { QuizSubmission } from "./quiz-submission.dto";
import { QuizSubmissionsRepository } from "./quiz-submissions.repository";
import { quizzesRepository, QuizSubmissionEntity } from "@/database";

export class QuizSubmissionsService {
  private quizSubmissionsRepository: QuizSubmissionsRepository;

  constructor() {
    this.quizSubmissionsRepository = new QuizSubmissionsRepository();
  }

  public async createSubmission(data: QuizSubmission): Promise<QuizSubmission> {
    const submission = await this.quizSubmissionsRepository.create(data);
    return submission;
  }

  public async getAllSubmissions(filters: {
    withDeleted: boolean;
  }): Promise<QuizSubmission[]> {
    const submissions = await this.quizSubmissionsRepository.findAll(filters);
    return submissions;
  }

  public async getSubmissionsByStudentId(
    studentId: number,
    filters: { withDeleted: boolean } = { withDeleted: false }
  ): Promise<QuizSubmission[]> {
    const submissions = await this.quizSubmissionsRepository.findByStudentId(
      studentId,
      filters
    );
    return submissions;
  }

  public async getSubmissionsByQuizId(
    quizId: number,
    filters: { withDeleted: boolean } = { withDeleted: false }
  ): Promise<QuizSubmission[]> {
    const submissions = await this.quizSubmissionsRepository.findByQuizId(
      quizId,
      filters
    );
    return submissions;
  }

  public async getSubmissionByStudentAndQuiz(
    studentId: number,
    quizId: number
  ): Promise<QuizSubmission | null> {
    const submission =
      await this.quizSubmissionsRepository.findByStudentAndQuiz(
        studentId,
        quizId
      );
    return submission;
  }

  public async getSubmissionById(id: number): Promise<QuizSubmission | null> {
    const submission = await this.quizSubmissionsRepository.findById(id);
    return submission;
  }

  public async updateSubmission(
    id: number,
    data: Partial<QuizSubmission>
  ): Promise<QuizSubmission | null> {
    const submission = await this.quizSubmissionsRepository.update(id, data);
    return submission;
  }

  public async deleteSubmission(id: number): Promise<boolean> {
    return this.quizSubmissionsRepository.delete(id);
  }

  public async submitQuiz(
    studentId: number,
    quizId: number,
    answers: any[]
  ): Promise<QuizSubmission> {
    const quiz = await quizzesRepository.findOneBy({ id: quizId });
    if (!quiz) {
      throw new Error("Quiz not found");
    }

    const existingSubmission = await this.getSubmissionByStudentAndQuiz(
      studentId,
      quizId
    );
    if (existingSubmission && existingSubmission.is_submitted) {
      throw new Error("Quiz already submitted");
    }

    const scoredAnswers = answers.map((answer, index) => {
      const question = quiz.questions[answer.question_index];
      const isCorrect =
        answer.student_answer.toLowerCase() ===
        question.correct_answer.toLowerCase();
      return {
        question_index: answer.question_index,
        student_answer: answer.student_answer,
        is_correct: isCorrect,
      };
    });

    const correctAnswers = scoredAnswers.filter(
      (answer) => answer.is_correct
    ).length;
    const totalQuestions = quiz.questions.length;
    const score = (correctAnswers / totalQuestions) * 100;

    const submissionData: Partial<QuizSubmissionEntity> = {
      student_id: studentId,
      quiz_id: quizId,
      answers: scoredAnswers,
      score: score,
      is_submitted: true,
      submitted_at: new Date(),
    };

    if (existingSubmission) {
      const updatedSubmission = await this.quizSubmissionsRepository.update(
        (existingSubmission as any).id,
        submissionData
      );
      return updatedSubmission!;
    } else {
      return await this.quizSubmissionsRepository.create(
        submissionData as QuizSubmission
      );
    }
  }
}
