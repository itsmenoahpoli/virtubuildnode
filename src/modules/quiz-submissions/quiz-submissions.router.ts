import { Router } from "express";
import { QuizSubmissionsController } from "./quiz-submissions.controller";

export class QuizSubmissionsRouter {
  private router: Router;
  private quizSubmissionsController: QuizSubmissionsController;

  constructor() {
    this.router = Router();
    this.quizSubmissionsController = new QuizSubmissionsController();

    this.initializeRoutes();
  }

  get routerRoutes() {
    return this.router;
  }

  private initializeRoutes() {
    this.router.post(
      "/",
      this.quizSubmissionsController.createSubmissionHandler
    );
    this.router.get(
      "/",
      this.quizSubmissionsController.getAllSubmissionsHandler
    );
    this.router.get(
      "/student/:studentId",
      this.quizSubmissionsController.getSubmissionsByStudentHandler
    );
    this.router.get(
      "/quiz/:quizId",
      this.quizSubmissionsController.getSubmissionsByQuizHandler
    );
    this.router.get(
      "/:id",
      this.quizSubmissionsController.getSubmissionByIdHandler
    );
    this.router.put(
      "/:id",
      this.quizSubmissionsController.updateSubmissionHandler
    );
    this.router.delete(
      "/:id",
      this.quizSubmissionsController.deleteSubmissionHandler
    );
    this.router.post(
      "/student/:studentId/quiz/:quizId/submit",
      this.quizSubmissionsController.submitQuizHandler
    );
  }
}
