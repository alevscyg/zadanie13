import { Controller, Body, Post, Get, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserDto } from './dto/user-dto';

@Controller()
export class UsersController {

    // constructor(private readonly usersService: UsersService) {}
    
    // @ApiOperation({summary: 'Создание пользователя'})
    // @ApiResponse({status: 200})
    // @Post()
    // async create(@Body() createUserDto: UserDto) {
    //     //return await this.usersService.create(createUserDto);
    // }

    // @ApiOperation({summary: 'Получить всех пользователей'})
    // @ApiResponse({status: 200})
    // @Get()
    // async findAll() {
    //     return await this.usersService.findAll();
    // }

    // @ApiOperation({summary: 'Получить пользователя по его email'})
    // @ApiResponse({status: 200})
    // @Get(':email')
    // async findOne(@Param('email') email: string) {
    //     return await this.usersService.findOne(email);
    // }

    // @ApiOperation({summary: 'Изменить пользователя по его id'})
    // @ApiResponse({status: 200})
    // @Patch(':id')
    // async update(@Param('id') id: string, @Body() updateUserDto: UserDto) {
    //     return await this.usersService.update(+id, updateUserDto);
    // }
    
    // @ApiOperation({summary: 'Удалить пользователя по его id'})
    // @ApiResponse({status: 200})
    // @Delete(':id')
    // async remove(@Param('id') id: string) {
    //     return await this.usersService.remove(+id);
    // }
}
