import { IsNumber, IsString, IsDecimal } from "class-validator";

export class CreateProductDto {

    @IsString()
    readonly name: string;

    @IsString()
    readonly price: string;

    @IsNumber()
    readonly user: number;
}
