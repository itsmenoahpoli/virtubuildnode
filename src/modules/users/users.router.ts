import { Router } from "express";
import { UsersController } from "./users.controller";

export class UsersRouter {
  private router: Router;
  private usersController: UsersController;

  constructor() {
    this.router = Router();
    this.usersController = new UsersController();

    this.initializeRoutes();
  }

  get routerRoutes() {
    return this.router;
  }

  private initializeRoutes() {
    this.router.post("/", this.usersController.createUserHandler);
    this.router.get("/", this.usersController.getAllUsersHandler);
    this.router.get("/:id", this.usersController.getUserByIdHandler);
    this.router.put("/:id", this.usersController.updateUserHandler);
    this.router.delete("/:id", this.usersController.deleteUserHandler);
  }
}
