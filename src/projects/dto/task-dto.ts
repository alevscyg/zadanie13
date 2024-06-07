import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class TasksDto{
    @ApiProperty({example: "Найти место для дерева", description: 'Название задачи'})
    @IsString({message: 'Должно быть строкой'})
    @Length(1, 100, {message: 'От 1 до 100 символов'})
    readonly title: string;
    @ApiProperty({example: "....", description: 'Описание задачи'})
    @IsString({message: 'Должно быть строкой'})
    @Length(1, 255, {message: 'От 1 до 255 символов'})
    readonly description: string;
}