import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Length } from "class-validator";

export class UpdateProjectDto{
    @ApiProperty({example: "Посадить дерево", description: 'Название проекта'})
    @Length(1, 100, {message: 'От 1 до 100 символов'})
    @IsString({message: 'Должно быть строкой'})
    @IsOptional()
    readonly title?: string;
    @ApiProperty({example: "....", description: 'Описание проекта'})
    @Length(1, 255, {message: 'От 1 до 255 символов'})
    @IsString({message: 'Должно быть строкой'})
    @IsOptional()
    readonly description?: string;
}