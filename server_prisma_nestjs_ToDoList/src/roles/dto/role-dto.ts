import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class RoleDto{
    @ApiProperty({example: 'USER', description: 'Уникальное значение роли'})
    @Length(1, 30, {message: 'Длина не больше 30'})
    @IsString({message: 'Должно быть строкой'})
    readonly value: string;
    @ApiProperty({example: 'Пользователь', description: 'Описание'})
    @Length(1, 255, {message: 'Длина не больше 255'})
    @IsString({message: 'Должно быть строкой'})
    readonly description: string;
}