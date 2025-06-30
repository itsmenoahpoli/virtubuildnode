import { type Request, type Response, type NextFunction } from "express";
import { BaseController } from "@/modules/base.controller";
import { AssessmentsService } from "./assessments.service";
import {
  AssessmentDataDTO,
  UpdateAssessmentDataDTO,
  Assessment,
} from "./assessment.dto";
import { ValidatePayload } from "@/decorators";
import { HttpErrorTypes, HttpStatusCode } from "@/types";

export class AssessmentsController extends BaseController {
  public assessmentsService: AssessmentsService;

  constructor() {
    super();

    this.assessmentsService = new AssessmentsService();
    this.bindClassMethods(this);
  }

  /**
   * @swagger
   * /assessments:
   *   post:
   *     summary: Create a new assessment
   *     description: Creates a new assessment with questions and answers
   *     tags: [Assessments]
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
   *                 description: ID of the instructor creating the assessment
   *               title:
   *                 type: string
   *                 description: Title of the assessment
   *               description:
   *                 type: string
   *                 description: Description of the assessment
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
   *         description: Assessment successfully created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Assessment'
   *       422:
   *         description: Validation error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  @ValidatePayload(AssessmentDataDTO)
  public async createAssessmentHandler(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    const result = await this.assessmentsService.createAssessment(
      request.body as Assessment
    );

    return this.sendHttpResponse(response, result, HttpStatusCode.CREATED);
  }

  /**
   * @swagger
   * /assessments:
   *   get:
   *     summary: Get all assessments
   *     description: Retrieves a list of all assessments with optional filters
   *     tags: [Assessments]
   *     parameters:
   *       - in: query
   *         name: withDeleted
   *         schema:
   *           type: boolean
   *         description: Include soft-deleted assessments in the response
   *     responses:
   *       200:
   *         description: List of assessments retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Assessment'
   */
  public async getAllAssessmentsHandler(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    const filters = this.generateListFilters(request.query as any);
    const result = await this.assessmentsService.getAllAssessments(filters);

    return this.sendHttpResponse(response, result, HttpStatusCode.OK);
  }

  /**
   * @swagger
   * /assessments/instructor/{instructorId}:
   *   get:
   *     summary: Get assessments by instructor
   *     description: Retrieves all assessments created by a specific instructor
   *     tags: [Assessments]
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
   *         description: Include soft-deleted assessments in the response
   *     responses:
   *       200:
   *         description: Assessments retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Assessment'
   */
  public async getAssessmentsByInstructorHandler(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    const instructorId = parseInt(request.params.instructorId);
    const filters = this.generateListFilters(request.query as any);
    const result = await this.assessmentsService.getAssessmentsByInstructorId(
      instructorId,
      filters
    );

    return this.sendHttpResponse(response, result, HttpStatusCode.OK);
  }

  /**
   * @swagger
   * /assessments/{id}:
   *   get:
   *     summary: Get assessment by ID
   *     description: Retrieves a specific assessment by its ID
   *     tags: [Assessments]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Assessment ID
   *     responses:
   *       200:
   *         description: Assessment retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Assessment'
   *       404:
   *         description: Assessment not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  public async getAssessmentByIdHandler(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    const id = parseInt(request.params.id);
    const result = await this.assessmentsService.getAssessmentById(id);

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
   * /assessments/{id}:
   *   put:
   *     summary: Update assessment
   *     description: Updates an existing assessment with new data
   *     tags: [Assessments]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Assessment ID
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
   *                 description: Title of the assessment
   *               description:
   *                 type: string
   *                 description: Description of the assessment
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
   *         description: Assessment updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Assessment'
   *       404:
   *         description: Assessment not found
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
  @ValidatePayload(UpdateAssessmentDataDTO)
  public async updateAssessmentHandler(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    const id = parseInt(request.params.id);
    const result = await this.assessmentsService.updateAssessment(
      id,
      request.body as Partial<Assessment>
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
   * /assessments/{id}:
   *   delete:
   *     summary: Delete assessment
   *     description: Soft deletes an assessment by its ID
   *     tags: [Assessments]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Assessment ID
   *     responses:
   *       200:
   *         description: Assessment deleted successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Assessment deleted successfully
   *       404:
   *         description: Assessment not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  public async deleteAssessmentHandler(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    const id = parseInt(request.params.id);
    const result = await this.assessmentsService.deleteAssessment(id);

    if (!result) {
      return this.sendHttpResponse(
        response,
        HttpErrorTypes.NOT_FOUND_ERROR,
        HttpStatusCode.NOT_FOUND
      );
    }

    return this.sendHttpResponse(
      response,
      { message: "Assessment deleted successfully" },
      HttpStatusCode.OK
    );
  }
}
