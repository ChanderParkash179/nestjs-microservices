import { IsDecimal, IsNumber, IsString } from "class-validator";

export class UpdateProductDto {

    @IsString()
    readonly name?: string;

    readonly price?: string;

    @IsNumber()
    readonly user?: number;
}
