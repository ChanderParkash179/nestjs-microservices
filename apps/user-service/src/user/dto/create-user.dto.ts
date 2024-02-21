import { IsEmail, IsString } from "class-validator";
import { Role } from "../enums/user.role";
import { Status } from "../enums/user.status";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    status: Status;

    @IsString()
    role: Role;
}