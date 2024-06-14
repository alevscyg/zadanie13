import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsNumber, IsOptional } from "class-validator";

export class UpdateTasksFieldDto{
    @ApiProperty({example: "str", description: 'Тип поля задач'})
    @IsOptional()
    @IsString({message: 'Должно быть строкой'})
    @Length(3, 3, {message: 'Должно быть длиной в 3 символа'})
    readonly taskFieldType: string;
    @ApiProperty({example: "Сделать сегодня", description: 'Описание поля задач'})
    @IsOptional()
    @IsString({message: 'Должно быть строкой'})
    @Length(1, 100, {message: 'От 1 до 100 символов'})
    readonly taskFieldTitle: string;
    @ApiProperty({example: "средний", description: 'Приоритет задачи'})
    @IsOptional()
    @IsString({message: 'Должно быть строкой'})
    @Length(1, 10, {message: 'От 1 до 10 символов'})
    readonly priority?: string;
    @ApiProperty({example: 1, description: 'Числовое поле задачи'})
    @IsOptional()
    @IsNumber({}, {message: "Должно быть числом"})
    readonly taskFieldInt?: number;
    @ApiProperty({example: "средний", description: 'Строковое поле задачи'})
    @IsOptional()
    @IsString({message: 'Должно быть строкой'})
    @Length(0, 255, {message: 'От 0 до 255 символов'})
    readonly taskFieldStr?: string;
}
