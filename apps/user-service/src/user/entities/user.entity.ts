import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../enums/user.status";
import { Role } from "../enums/user.role";
import * as bcrypt from 'bcrypt';

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

    @Column({ type: 'enum', enum: Status, default: Status.PENDING })
    status: Status;

    @Column({ type: 'enum', enum: Role, default: Role.NORMAL })
    role: Role;

    @BeforeInsert()
    async hashedPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}