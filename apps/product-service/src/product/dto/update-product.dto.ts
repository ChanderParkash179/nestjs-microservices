import { IsDecimal, IsNumber, IsString } from "class-validator";

export class UpdateProductDto {

    @IsString()
    readonly name?: string;

    @IsDecimal()
    readonly price?: string;

    @IsNumber()
    readonly user?: number;
}
