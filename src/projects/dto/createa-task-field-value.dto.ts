import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsNumber, IsOptional } from "class-validator";

export class TasksFieldValueDto{
    @ApiProperty({example: "средний", description: 'Приоритет задачи'})
    @IsOptional()
    @IsString({message: 'Должно быть строкой'})
    @Length(1, 10, {message: 'От 1 до 10 символов'})
    readonly priority: string;
    @ApiProperty({example: 1, description: 'Числовое поле задачи'})
    @IsOptional()
    @IsNumber({}, {message: "Должно быть числом"})
    readonly taskFieldInt: number;
    @ApiProperty({example: "средний", description: 'Строковое поле задачи'})
    @IsOptional()
    @IsString({message: 'Должно быть строкой'})
    @Length(0, 255, {message: 'От 0 до 255 символов'})
    readonly taskFieldStr: string;
}
