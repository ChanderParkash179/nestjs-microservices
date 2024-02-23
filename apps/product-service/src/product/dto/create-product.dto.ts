import { IsNumber, IsString, IsDecimal } from "class-validator";

export class CreateProductDto {

    @IsString()
    readonly name: string;

    @IsDecimal()
    readonly price: number;

    @IsNumber()
    readonly user: number;
}
