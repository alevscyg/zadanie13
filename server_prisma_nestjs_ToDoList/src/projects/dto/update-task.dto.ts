import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString, Length } from "class-validator";

enum Priority {
    High = "High",
    Medium = "Medium",
    Low = "Low"
}

enum TaskFieldType {
    str = "str",
    int = "int"
}

export class UpdateTasksDto{
    @ApiProperty({example: "Найти место для дерева", description: 'Название задачи'})
    @Length(1, 100, {message: 'От 1 до 100 символов'})
    @IsString({message: 'Должно быть строкой'})
    @IsOptional()
    readonly title?: string;
    @ApiProperty({example: "....", description: 'Описание задачи'})
    @Length(1, 255, {message: 'От 1 до 255 символов'})
    @IsString({message: 'Должно быть строкой'})
    @IsOptional()
    readonly description?: string;
    @ApiProperty({example: "str", description: "Доступные значения: str|int"})
    @IsEnum(TaskFieldType, {message: "Доступные значения: str|int"})
    @IsOptional()
    readonly taskFieldType?: TaskFieldType;
    @ApiProperty({example: "Сделать сегодня", description: 'Описание поля задач'})
    @Length(1, 100, {message: 'От 1 до 100 символов'})
    @IsString({message: 'Должно быть строкой'})
    @IsOptional()
    readonly taskFieldTitle?: string;
    @ApiProperty({example: "Medium", description: 'Доступные значения: High|Medium|Low'})
    @IsEnum(Priority, {message: 'Доступные значения: High|Medium|Low'})
    @IsOptional()
    readonly taskPriority?: Priority;
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