import { type Request, type Response, type NextFunction } from "express";
import { BaseController } from "@/modules/base.controller";
import { QuizzesService } from "./quizzes.service";
import { QuizDataDTO, UpdateQuizDataDTO, Quiz } from "./quiz.dto";
import { ValidatePayload } from "@/decorators";
import { HttpErrorTypes, HttpStatusCode } from "@/types";

export class QuizzesController extends BaseController {
  public quizzesService: QuizzesService;

  constructor() {
    super();

    this.quizzesService = new QuizzesService();
    this.bindClassMethods(this);
  }

  /**
   * @swagger
   * /quizzes:
   *   post:
   *     summary: Create a new quiz
   *     description: Creates a new quiz with questions and answers
   *     tags: [Quizzes]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - instructor_id
   *               - title
   *               - description
   *               - questions
   *             properties:
   *               instructor_id:
   *                 type: integer
   *                 description: ID of the instructor creating the quiz
   *               title:
   *                 type: string
   *                 description: Title of the quiz
   *               description:
   *                 type: string
   *                 description: Description of the quiz
   *               questions:
   *                 type: array
   *                 items:
   *                   type: object
   *                   required:
   *                     - question
   *                     - type
   *                     - correct_answer
   *                   properties:
   *                     question:
   *                       type: string
   *                       description: The question text
   *                     type:
   *                       type: string
   *                       enum: [enumeration, multiple_choices]
   *                       description: Type of question
   *                     correct_answer:
   *                       type: string
   *                       description: The correct answer
   *                     choices:
   *                       type: array
   *                       items:
   *                         type: object
   *                         properties:
   *                           choice:
   *                             type: string
   *                             enum: [a, b, c, d]
   *                             description: Multiple choice option
   *     responses:
   *       201:
   *         description: Quiz successfully created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Quiz'
   *       422:
   *         description: Validation error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  @ValidatePayload(QuizDataDTO)
  public async createQuizHandler(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    const result = await this.quizzesService.createQuiz(request.body as Quiz);

    return this.sendHttpResponse(response, result, HttpStatusCode.CREATED);
  }

  /**
   * @swagger
   * /quizzes:
   *   get:
   *     summary: Get all quizzes
   *     description: Retrieves a list of all quizzes with optional filters
   *     tags: [Quizzes]
   *     parameters:
   *       - in: query
   *         name: withDeleted
   *         schema:
   *           type: boolean
   *         description: Include soft-deleted quizzes in the response
   *     responses:
   *       200:
   *         description: List of quizzes retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Quiz'
   */
  public async getAllQuizzesHandler(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    const filters = this.generateListFilters(request.query as any);
    const result = await this.quizzesService.getAllQuizzes(filters);

    return this.sendHttpResponse(response, result, HttpStatusCode.OK);
  }

  /**
   * @swagger
   * /quizzes/instructor/{instructorId}:
   *   get:
   *     summary: Get quizzes by instructor
   *     description: Retrieves all quizzes created by a specific instructor
   *     tags: [Quizzes]
   *     parameters:
   *       - in: path
   *         name: instructorId
   *         required: true
   *         schema:
   *           type: integer
   *         description: Instructor ID
   *       - in: query
   *         name: withDeleted
   *         schema:
   *           type: boolean
   *         description: Include soft-deleted quizzes in the response
   *     responses:
   *       200:
   *         description: Quizzes retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Quiz'
   */
  public async getQuizzesByInstructorHandler(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    const instructorId = parseInt(request.params.instructorId);
    const filters = this.generateListFilters(request.query as any);
    const result = await this.quizzesService.getQuizzesByInstructorId(
      instructorId,
      filters
    );

    return this.sendHttpResponse(response, result, HttpStatusCode.OK);
  }

  /**
   * @swagger
   * /quizzes/{id}:
   *   get:
   *     summary: Get quiz by ID
   *     description: Retrieves a specific quiz by its ID
   *     tags: [Quizzes]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Quiz ID
   *     responses:
   *       200:
   *         description: Quiz retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Quiz'
   *       404:
   *         description: Quiz not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  public async getQuizByIdHandler(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    const quizId = parseInt(request.params.id);
    const result = await this.quizzesService.getQuizById(quizId);

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
   * /quizzes/{id}:
   *   put:
   *     summary: Update quiz
   *     description: Updates an existing quiz with the provided information
   *     tags: [Quizzes]
   *     parameters:
   *       - in: path
   *         name: id
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
   *             properties:
   *               instructor_id:
   *                 type: integer
   *                 description: ID of the instructor
   *               title:
   *                 type: string
   *                 description: Title of the quiz
   *               description:
   *                 type: string
   *                 description: Description of the quiz
   *               questions:
   *                 type: array
   *                 items:
   *                   type: object
   *                   properties:
   *                     question:
   *                       type: string
   *                       description: The question text
   *                     type:
   *                       type: string
   *                       enum: [enumeration, multiple_choices]
   *                       description: Type of question
   *                     correct_answer:
   *                       type: string
   *                       description: The correct answer
   *                     choices:
   *                       type: array
   *                       items:
   *                         type: object
   *                         properties:
   *                           choice:
   *                             type: string
   *                             enum: [a, b, c, d]
   *                             description: Multiple choice option
   *     responses:
   *       200:
   *         description: Quiz updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Quiz'
   *       404:
   *         description: Quiz not found
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
  @ValidatePayload(UpdateQuizDataDTO)
  public async updateQuizHandler(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    const quizId = parseInt(request.params.id);
    const result = await this.quizzesService.updateQuiz(
      quizId,
      request.body as Partial<Quiz>
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
   * /quizzes/{id}:
   *   delete:
   *     summary: Delete quiz
   *     description: Soft deletes a quiz by its ID
   *     tags: [Quizzes]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Quiz ID
   *     responses:
   *       200:
   *         description: Quiz deleted successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Quiz deleted successfully"
   *       404:
   *         description: Quiz not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  public async deleteQuizHandler(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    const quizId = parseInt(request.params.id);
    const result = await this.quizzesService.deleteQuiz(quizId);

    if (!result) {
      return this.sendHttpResponse(
        response,
        HttpErrorTypes.NOT_FOUND_ERROR,
        HttpStatusCode.NOT_FOUND
      );
    }

    return this.sendHttpResponse(
      response,
      { message: "Quiz deleted successfully" },
      HttpStatusCode.OK
    );
  }
}
