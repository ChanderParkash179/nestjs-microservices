import { IsEmail, IsString } from "class-validator";
import { Role } from "../enums/user.role";
import { Status } from "../enums/user.status";

export class UpdateUserDto {
    name?: string;
    email?: string;
    password?: string;
    status?: Status;
    role?: Role;
}