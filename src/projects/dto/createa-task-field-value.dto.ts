import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsNumber, IsOptional } from "class-validator";

export class TasksFieldValueDto{
    @ApiProperty({example: 1, description: 'Числовое поле задачи'})
    @IsNumber({}, {message: "Должно быть числом"})
    @IsOptional()
    readonly taskFieldInt?: number;
    @ApiProperty({example: "средний", description: 'Строковое поле задачи'})
    @Length(0, 255, {message: 'От 0 до 255 символов'})
    @IsString({message: 'Должно быть строкой'})
    @IsOptional()
    readonly taskFieldStr?: string;
}
