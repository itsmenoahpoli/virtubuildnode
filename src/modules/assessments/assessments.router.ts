import { Router } from "express";
import { AssessmentsController } from "./assessments.controller";

export class AssessmentsRouter {
  private router: Router;
  private assessmentsController: AssessmentsController;

  constructor() {
    this.router = Router();
    this.assessmentsController = new AssessmentsController();

    this.initializeRoutes();
  }

  get routerRoutes() {
    return this.router;
  }

  private initializeRoutes() {
    this.router.post("/", this.assessmentsController.createAssessmentHandler);
    this.router.get("/", this.assessmentsController.getAllAssessmentsHandler);
    this.router.get(
      "/instructor/:instructorId",
      this.assessmentsController.getAssessmentsByInstructorHandler
    );
    this.router.get(
      "/:id",
      this.assessmentsController.getAssessmentByIdHandler
    );
    this.router.put("/:id", this.assessmentsController.updateAssessmentHandler);
    this.router.delete(
      "/:id",
      this.assessmentsController.deleteAssessmentHandler
    );
  }
}
