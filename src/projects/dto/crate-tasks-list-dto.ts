import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Length } from "class-validator";

export class CreateTasksListDto{
    @ApiProperty({example: "done", description: 'Название листа задач'})
    @Length(1, 100, {message: 'От 1 до 100 символов'})
    @IsString({message: 'Должно быть строкой'})
    readonly title: string;
    @ApiProperty({example: "....", description: 'Описание листа задач'})
    @Length(1, 255, {message: 'От 1 до 255 символов'})
    @IsString({message: 'Должно быть строкой'})
    @IsOptional()
    readonly description?: string;
}