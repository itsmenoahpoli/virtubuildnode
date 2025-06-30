import { type Request, type Response, type NextFunction } from "express";
import { BaseController } from "@/modules/base.controller";
import { QuizSubmissionsService } from "./quiz-submissions.service";
import {
  QuizSubmissionDataDTO,
  UpdateQuizSubmissionDataDTO,
  SubmitQuizDTO,
} from "./quiz-submission.dto";
import { ValidatePayload } from "@/decorators";
import { HttpErrorTypes, HttpStatusCode } from "@/types";

export class QuizSubmissionsController extends BaseController {
  public quizSubmissionsService: QuizSubmissionsService;

  constructor() {
    super();

    this.quizSubmissionsService = new QuizSubmissionsService();
    this.bindClassMethods(this);
  }

  /**
   * @swagger
   * /quiz-submissions:
   *   post:
   *     summary: Create a new quiz submission
   *     description: Creates a new quiz submission record
   *     tags: [Quiz Submissions]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - student_id
   *               - quiz_id
   *               - answers
   *               - score
   *             properties:
   *               student_id:
   *                 type: integer
   *                 description: ID of the student submitting the quiz
   *               quiz_id:
   *                 type: integer
   *                 description: ID of the quiz being submitted
   *               answers:
   *                 type: array
   *                 items:
   *                   type: object
   *                   required:
   *                     - question_index
   *                     - student_answer
   *                     - is_correct
   *                   properties:
   *                     question_index:
   *                       type: integer
   *                       description: Index of the question (0-based)
   *                     student_answer:
   *                       type: string
   *                       description: Student's answer to the question
   *                     is_correct:
   *                       type: boolean
   *                       description: Whether the answer is correct
   *               score:
   *                 type: number
   *                 format: float
   *                 description: Percentage score (0-100)
   *               is_submitted:
   *                 type: boolean
   *                 description: Whether the quiz has been submitted
   *               submitted_at:
   *                 type: string
   *                 format: date-time
   *                 description: Timestamp when the quiz was submitted
   *     responses:
   *       201:
   *         description: Quiz submission successfully created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/QuizSubmission'
   *       422:
   *         description: Validation error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  @ValidatePayload(QuizSubmissionDataDTO)
  public async createSubmissionHandler(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    const result = await this.quizSubmissionsService.createSubmission(
      request.body
    );

    return this.sendHttpResponse(response, result, HttpStatusCode.CREATED);
  }

  /**
   * @swagger
   * /quiz-submissions:
   *   get:
   *     summary: Get all quiz submissions
   *     description: Retrieves a list of all quiz submissions with optional filters
   *     tags: [Quiz Submissions]
   *     parameters:
   *       - in: query
   *         name: withDeleted
   *         schema:
   *           type: boolean
   *         description: Include soft-deleted submissions in the response
   *     responses:
   *       200:
   *         description: List of quiz submissions retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/QuizSubmission'
   */
  public async getAllSubmissionsHandler(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    const filters = this.generateListFilters(request.query as any);
    const result = await this.quizSubmissionsService.getAllSubmissions(filters);

    return this.sendHttpResponse(response, result, HttpStatusCode.OK);
  }

  /**
   * @swagger
   * /quiz-submissions/student/{studentId}:
   *   get:
   *     summary: Get submissions by student
   *     description: Retrieves all quiz submissions for a specific student
   *     tags: [Quiz Submissions]
   *     parameters:
   *       - in: path
   *         name: studentId
   *         required: true
   *         schema:
   *           type: integer
   *         description: Student ID
   *       - in: query
   *         name: withDeleted
   *         schema:
   *           type: boolean
   *         description: Include soft-deleted submissions in the response
   *     responses:
   *       200:
   *         description: Student submissions retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/QuizSubmission'
   */
  public async getSubmissionsByStudentHandler(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    const studentId = parseInt(request.params.studentId);
    const filters = this.generateListFilters(request.query as any);
    const result = await this.quizSubmissionsService.getSubmissionsByStudentId(
      studentId,
      filters
    );

    return this.sendHttpResponse(response, result, HttpStatusCode.OK);
  }

  /**
   * @swagger
   * /quiz-submissions/quiz/{quizId}:
   *   get:
   *     summary: Get submissions by quiz
   *     description: Retrieves all submissions for a specific quiz
   *     tags: [Quiz Submissions]
   *     parameters:
   *       - in: path
   *         name: quizId
   *         required: true
   *         schema:
   *           type: integer
   *         description: Quiz ID
   *       - in: query
   *         name: withDeleted
   *         schema:
   *           type: boolean
   *         description: Include soft-deleted submissions in the response
   *     responses:
   *       200:
   *         description: Quiz submissions retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/QuizSubmission'
   */
  public async getSubmissionsByQuizHandler(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    const quizId = parseInt(request.params.quizId);
    const filters = this.generateListFilters(request.query as any);
    const result = await this.quizSubmissionsService.getSubmissionsByQuizId(
      quizId,
      filters
    );

    return this.sendHttpResponse(response, result, HttpStatusCode.OK);
  }

  /**
   * @swagger
   * /quiz-submissions/{id}:
   *   get:
   *     summary: Get submission by ID
   *     description: Retrieves a specific quiz submission by its ID
   *     tags: [Quiz Submissions]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Submission ID
   *     responses:
   *       200:
   *         description: Submission retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/QuizSubmission'
   *       404:
   *         description: Submission not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  public async getSubmissionByIdHandler(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    const submissionId = parseInt(request.params.id);
    const result =
      await this.quizSubmissionsService.getSubmissionById(submissionId);

    if (!result) {
      return this.sendHttpResponse(
        response,
        HttpErrorTypes.NOT_FOUND_ERROR,
        HttpStatusCode.NOT_FOUND
      );
    }

    return this.sendHttpResponse(response, result, HttpStatusCode.OK);
  }

  /**
   * @swagger
   * /quiz-submissions/{id}:
   *   put:
   *     summary: Update submission
   *     description: Updates an existing quiz submission
   *     tags: [Quiz Submissions]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Submission ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               student_id:
   *                 type: integer
   *                 description: ID of the student
   *               quiz_id:
   *                 type: integer
   *                 description: ID of the quiz
   *               answers:
   *                 type: array
   *                 items:
   *                   type: object
   *                   properties:
   *                     question_index:
   *                       type: integer
   *                       description: Index of the question
   *                     student_answer:
   *                       type: string
   *                       description: Student's answer
   *                     is_correct:
   *                       type: boolean
   *                       description: Whether the answer is correct
   *               score:
   *                 type: number
   *                 format: float
   *                 description: Percentage score
   *               is_submitted:
   *                 type: boolean
   *                 description: Whether the quiz has been submitted
   *               submitted_at:
   *                 type: string
   *                 format: date-time
   *                 description: Submission timestamp
   *     responses:
   *       200:
   *         description: Submission updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/QuizSubmission'
   *       404:
   *         description: Submission not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       422:
   *         description: Validation error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  @ValidatePayload(UpdateQuizSubmissionDataDTO)
  public async updateSubmissionHandler(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    const submissionId = parseInt(request.params.id);
    const result = await this.quizSubmissionsService.updateSubmission(
      submissionId,
      request.body
    );

    if (!result) {
      return this.sendHttpResponse(
        response,
        HttpErrorTypes.NOT_FOUND_ERROR,
        HttpStatusCode.NOT_FOUND
      );
    }

    return this.sendHttpResponse(response, result, HttpStatusCode.OK);
  }

  /**
   * @swagger
   * /quiz-submissions/{id}:
   *   delete:
   *     summary: Delete submission
   *     description: Soft deletes a quiz submission by its ID
   *     tags: [Quiz Submissions]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Submission ID
   *     responses:
   *       200:
   *         description: Submission deleted successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Quiz submission deleted successfully"
   *       404:
   *         description: Submission not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  public async deleteSubmissionHandler(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    const submissionId = parseInt(request.params.id);
    const result =
      await this.quizSubmissionsService.deleteSubmission(submissionId);

    if (!result) {
      return this.sendHttpResponse(
        response,
        HttpErrorTypes.NOT_FOUND_ERROR,
        HttpStatusCode.NOT_FOUND
      );
    }

    return this.sendHttpResponse(
      response,
      { message: "Quiz submission deleted successfully" },
      HttpStatusCode.OK
    );
  }

  /**
   * @swagger
   * /quiz-submissions/student/{studentId}/quiz/{quizId}/submit:
   *   post:
   *     summary: Submit quiz answers
   *     description: Submits quiz answers for a student, automatically scores and calculates results
   *     tags: [Quiz Submissions]
   *     parameters:
   *       - in: path
   *         name: studentId
   *         required: true
   *         schema:
   *           type: integer
   *         description: Student ID
   *       - in: path
   *         name: quizId
   *         required: true
   *         schema:
   *           type: integer
   *         description: Quiz ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - answers
   *             properties:
   *               answers:
   *                 type: array
   *                 items:
   *                   type: object
   *                   required:
   *                     - question_index
   *                     - student_answer
   *                   properties:
   *                     question_index:
   *                       type: integer
   *                       description: Index of the question (0-based)
   *                     student_answer:
   *                       type: string
   *                       description: Student's answer to the question
   *     responses:
   *       201:
   *         description: Quiz submitted successfully with automatic scoring
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/QuizSubmission'
   *       400:
   *         description: Bad request (quiz not found, already submitted, etc.)
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Quiz not found"
   *       422:
   *         description: Validation error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  @ValidatePayload(SubmitQuizDTO)
  public async submitQuizHandler(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const studentId = parseInt(request.params.studentId);
      const quizId = parseInt(request.params.quizId);
      const result = await this.quizSubmissionsService.submitQuiz(
        studentId,
        quizId,
        request.body.answers
      );

      return this.sendHttpResponse(response, result, HttpStatusCode.CREATED);
    } catch (error: any) {
      return this.sendHttpResponse(
        response,
        { message: error.message },
        HttpStatusCode.BAD_REQUEST
      );
    }
  }
}
