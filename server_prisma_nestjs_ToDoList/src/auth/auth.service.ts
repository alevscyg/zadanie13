import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { UserDto } from 'src/users/dto/user-dto';



@Injectable()
export class AuthService {

    constructor(private userService: UsersService, private jwtService: JwtService) {}

    async login(createUserDto: UserDto) {
        const user = await this.validateUser(createUserDto)
        return await this.generateToken(user.email, user.id, user.role[0].value)
    }

    async registration(createUserDto: UserDto) {
        const candidate = await this.userService.findOne(createUserDto.email);
        if (candidate) throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST);
        const hashPassword = await bcrypt.hash(createUserDto.password, 5);
        const user = await this.userService.create({...createUserDto, password: hashPassword})
        return await this.generateToken(user.email, user.id, user.role[0].value)
    }

    private async generateToken(email: string, id: number, role: string) {
        return { token: this.jwtService.sign({email: email, id: id, role: role}) }
    }

    private async validateUser(createUserDto: UserDto) {
        const user = await this.userService.findOne(createUserDto.email);
        const passwordEquals = await bcrypt.compare(createUserDto.password, user.password);
        if (user && passwordEquals) return user;
        throw new UnauthorizedException({message: 'Некорректный емайл или пароль'})
    }
}
