import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsString()
    description: string;

    @IsBoolean()
    @IsOptional()
    isActive: boolean 
}
