import { Controller, Body, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthDtoResponse } from './dto/auth-dto-response';

import { UserDto } from 'src/users/dto/user-dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @UsePipes(ValidationPipe)
    @ApiOperation({summary: 'Логин'})
    @ApiResponse({status: 200, type: AuthDtoResponse})
    @Post('/login')
    async login(@Body() createUserDto: UserDto) {
        return await this.authService.login(createUserDto);
    }

    @UsePipes(ValidationPipe)
    @ApiOperation({summary: 'Регистрация'})
    @ApiResponse({status: 200, type: AuthDtoResponse})
    @Post('/registration')
    async registration(@Body() createUserDto: UserDto) {
        return await this.authService.registration(createUserDto);
    }

}
