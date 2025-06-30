import { type Request, type Response, type NextFunction } from "express";
import { BaseController } from "@/modules/base.controller";
import { UsersService } from "./users.service";
import { UserDataDTO, UpdateUserDataDTO, User } from "./user.dto";
import { ValidatePayload } from "@/decorators";
import { HttpErrorTypes, HttpStatusCode } from "@/types";

export class UsersController extends BaseController {
  public usersService: UsersService;

  constructor() {
    super();

    this.usersService = new UsersService();
    this.bindClassMethods(this);
  }

  /**
   * @swagger
   * /users:
   *   post:
   *     summary: Create a new user
   *     description: Creates a new user account with the provided information
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UserData'
   *     responses:
   *       201:
   *         description: User successfully created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       422:
   *         description: User already exists or validation error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  @ValidatePayload(UserDataDTO)
  public async createUserHandler(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    const result = await this.usersService.createUser(request.body as User);

    if (result.userExists) {
      return this.sendHttpResponse(
        response,
        HttpErrorTypes.ALREADY_EXISTS,
        HttpStatusCode.UNPROCESSABLE_ENTITY
      );
    }

    return this.sendHttpResponse(response, result.user, HttpStatusCode.CREATED);
  }

  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Get all users
   *     description: Retrieves a list of all users with optional filters
   *     tags: [Users]
   *     parameters:
   *       - in: query
   *         name: withDeleted
   *         schema:
   *           type: boolean
   *         description: Include soft-deleted users in the response
   *     responses:
   *       200:
   *         description: List of users retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/User'
   */
  public async getAllUsersHandler(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    const filters = this.generateListFilters(request.query as any);
    const result = await this.usersService.getAllUsers(filters);

    return this.sendHttpResponse(response, result, HttpStatusCode.OK);
  }

  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     summary: Get user by ID
   *     description: Retrieves a specific user by their ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: User ID
   *     responses:
   *       200:
   *         description: User retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       404:
   *         description: User not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  public async getUserByIdHandler(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    const userId = parseInt(request.params.id);
    const result = await this.usersService.getUserById(userId);

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
   * /users/{id}:
   *   put:
   *     summary: Update user
   *     description: Updates an existing user with the provided information
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: User ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateUserData'
   *     responses:
   *       200:
   *         description: User updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       404:
   *         description: User not found
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
  @ValidatePayload(UpdateUserDataDTO)
  public async updateUserHandler(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    const userId = parseInt(request.params.id);
    const result = await this.usersService.updateUser(
      userId,
      request.body as Partial<User>
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
   * /users/{id}:
   *   delete:
   *     summary: Delete user
   *     description: Soft deletes a user by their ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: User ID
   *     responses:
   *       204:
   *         description: User deleted successfully
   *       404:
   *         description: User not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  public async deleteUserHandler(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    const userId = parseInt(request.params.id);
    const result = await this.usersService.deleteUser(userId);

    if (!result) {
      return this.sendHttpResponse(
        response,
        HttpErrorTypes.NOT_FOUND_ERROR,
        HttpStatusCode.NOT_FOUND
      );
    }

    return this.sendHttpResponse(response, null, HttpStatusCode.NO_CONTENT);
  }
}
