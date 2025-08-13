import { IsNotEmpty, IsNumber, isNumber, IsOptional, IsString } from "class-validator";
import { Item } from "./item.schema";

export class CreateItemDto implements Item {
    @IsNotEmpty({ message: "O nome é obrigatório" })
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsNotEmpty({ message: "O preço é obrigatório" })
    @IsNumber()
    price: number;
}

export class UpdateItemDto implements Item {
    @IsNotEmpty({ message: "O nome é obrigatório" })
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsNotEmpty({ message: "O preço é obrigatório" })
    @IsNumber()
    price: number;
}