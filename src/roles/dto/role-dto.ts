import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class RoleDto{
    @ApiProperty({example: 'USER', description: 'Уникальное значение роли'})
    @IsString({message: 'Должно быть строкой'})
    readonly value: string;
    @ApiProperty({example: 'Пользователь', description: 'Описание'})
    @IsString({message: 'Должно быть строкой'})
    readonly description: string;
}