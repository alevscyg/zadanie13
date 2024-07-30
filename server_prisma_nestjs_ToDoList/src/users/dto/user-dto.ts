import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class UserDto{
    @ApiProperty({example: 'user@mail.ru', description: 'Почта'})
    @Length(5, 255, {message: 'Не меньше 5 и не больше 255'})
    @IsEmail({}, {message: "Некорректный email"})
    @IsString({message: 'Должно быть строкой'})
    readonly email: string;
    @ApiProperty({example: 'fs3fGfsf5', description: 'Пароль'})
    @Length(4, 16, {message: 'Не меньше 4 и не больше 16'})
    @IsString({message: 'Должно быть строкой'})
    readonly password: string;
}