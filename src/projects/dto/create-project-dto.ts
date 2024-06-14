import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Length } from "class-validator";

export class CreateProjectDto{
    @ApiProperty({example: "Посадить дерево", description: 'Название проекта'})
    @IsString({message: 'Должно быть строкой'})
    @Length(1, 100, {message: 'От 1 до 100 символов'})
    readonly title: string;
    @ApiProperty({example: "....", description: 'Описание проекта'})
    @IsString({message: 'Должно быть строкой'})
    @IsOptional()
    @Length(1, 255, {message: 'От 1 до 255 символов'})
    readonly description: string;
}