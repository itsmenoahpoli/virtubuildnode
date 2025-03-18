import { type Request, type Response, type NextFunction } from "express";
import { BaseController } from "@/modules/base.controller";
import { UserRolesService } from "./user-roles.service";
import { ValidateUrlParams, ValidatePayload } from "@/decorators";
import { SendHttpResponse } from "@/utils";
import { HttpStatusCode, ListFilterKeys } from "@/types";
import { UserRole, UserRoleDTO } from "./user-role.dto";

export class UserRolesController extends BaseController {
	public userRolesService: UserRolesService;

	constructor() {
		super();

		this.userRolesService = new UserRolesService();
		this.bindClassMethods(this);
	}

	public async fetchListHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
		const filtersFromQuery = this.generateListFilters(request.query as ListFilterKeys);
		const result = await this.userRolesService.fetchList(filtersFromQuery);

		return SendHttpResponse(response, result, HttpStatusCode.OK);
	}

	@ValidateUrlParams("id")
	public async fetchByIdHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
		//
	}

	@ValidateUrlParams("id")
	public async updateByIdHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
		const result = await this.userRolesService.updateById(+request.params?.id, request.body as UserRole);

		return SendHttpResponse(response, result, HttpStatusCode.OK);
	}

	@ValidateUrlParams("id")
	public async deleteByIdHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
		const result = await this.userRolesService.deleteById(+request.params?.id);

		return SendHttpResponse(response, result, HttpStatusCode.OK);
	}

	@ValidatePayload(UserRoleDTO)
	public async createHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
		const result = await this.userRolesService.create(request.body as UserRole);

		if (!result) {
			return SendHttpResponse(response, "ALREADY_EXISTS", HttpStatusCode.UNPROCESSABLE_ENTITY);
		}

		return SendHttpResponse(response, result, HttpStatusCode.CREATED);
	}
}
