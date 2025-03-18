import { type Request, type Response, type NextFunction } from "express";
import { BaseController } from "@/modules/base.controller";
import { AuthService } from "./auth.service";
import { SigninCredentialsDTO, SigninCredentials, SignupDataDTO, SignupData } from "./auth.dto";
import { ValidatePayload } from "@/decorators";
import { HttpErrorTypes, HttpStatusCode } from "@/types";

export class AuthController extends BaseController {
	public authService: AuthService;

	constructor() {
		super();

		this.authService = new AuthService();
		this.bindClassMethods(this);
	}

	@ValidatePayload(SigninCredentialsDTO)
	public async signinHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
		const result = await this.authService.signinAccount(request.body as SigninCredentials);

		if (!result) {
			return this.sendHttpResponse(response, HttpErrorTypes.UNAUTHORIZED_ERROR, HttpStatusCode.UNAUTHORIZED);
		}

		return this.sendHttpResponse(response, result, HttpStatusCode.OK);
	}

	@ValidatePayload(SignupDataDTO)
	public async signupHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
		const result = await this.authService.signupAccount(request.body as SignupData);

		if (result.accountExists) {
			return this.sendHttpResponse(response, HttpErrorTypes.ALREADY_EXISTS, HttpStatusCode.UNPROCESSABLE_ENTITY);
		}

		return this.sendHttpResponse(response, result, HttpStatusCode.CREATED);
	}
}
