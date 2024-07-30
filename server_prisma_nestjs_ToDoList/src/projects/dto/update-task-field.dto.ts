import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString, Length, IsNumber, IsOptional } from "class-validator";

enum TaskFieldType {
    str = "str",
    int = "int"
}

export class UpdateTasksFieldDto{
    @ApiProperty({example: "str", description: "Доступные значения: str|int"})
    @IsEnum(TaskFieldType, {message: "Доступные значения: str|int"})
    @IsOptional()
    readonly taskFieldType?: TaskFieldType;
    @ApiProperty({example: "Сделать сегодня", description: 'Описание поля задач'})
    @Length(1, 100, {message: 'От 1 до 100 символов'})
    @IsString({message: 'Должно быть строкой'})
    @IsOptional()
    readonly taskFieldTitle?: string;
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