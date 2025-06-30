import { Router } from "express";
import { QuizzesController } from "./quizzes.controller";

export class QuizzesRouter {
  private router: Router;
  private quizzesController: QuizzesController;

  constructor() {
    this.router = Router();
    this.quizzesController = new QuizzesController();

    this.initializeRoutes();
  }

  get routerRoutes() {
    return this.router;
  }

  private initializeRoutes() {
    this.router.post("/", this.quizzesController.createQuizHandler);
    this.router.get("/", this.quizzesController.getAllQuizzesHandler);
    this.router.get(
      "/instructor/:instructorId",
      this.quizzesController.getQuizzesByInstructorHandler
    );
    this.router.get("/:id", this.quizzesController.getQuizByIdHandler);
    this.router.put("/:id", this.quizzesController.updateQuizHandler);
    this.router.delete("/:id", this.quizzesController.deleteQuizHandler);
  }
}
