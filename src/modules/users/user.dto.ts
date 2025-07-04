import {
  IsEmail,
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
} from "class-validator";
import { User as UserEntity } from "@/database/entities";
import { type OmitDbFields } from "@/types";

export type User = OmitDbFields<UserEntity>;

export class UserDataDTO implements User {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  middleName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsBoolean()
  isEnabled: boolean;
}

export class UpdateUserDataDTO {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsBoolean()
  isEnabled?: boolean;
}
