import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../enums/user.status";
import { Role } from "../enums/user.role";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ type: 'enum', enum: Status, default: Status.PENDING, nullable: false })
    status: Status;

    @Column({ type: 'enum', enum: Role, default: Role.NORMAL, nullable: false })
    role: Role;
}