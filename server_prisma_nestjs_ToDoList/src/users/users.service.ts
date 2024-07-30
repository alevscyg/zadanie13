import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserDto } from './dto/user-dto';

@Injectable()
export class UsersService {

  constructor(private databaseService: DatabaseService){}

  async create(createUserDto: UserDto) {
      const role = await this.databaseService.role.findUnique({ where: { value: "USER" } });
      const user = await this.databaseService.user.create({ data: createUserDto });
      await this.databaseService.userRole.create({ data : {
        userid: user.id,
        value: role.value
      }});
      return await this.findOne(createUserDto.email);
    }
    
  async findAll() {
    return await this.databaseService.user.findMany({include: {
      role: true
    }});
  }
    
  async findOne(email: string) {
    return await this.databaseService.user.findUnique({ 
      where: {
        email
      },
      include: {
      role: true
    }, });
  }
    
  async update(id: number, updateUsertDto: UserDto) {
    return await this.databaseService.user.update({
      where: {
        id,
      },
      data: updateUsertDto,
    });
  }
    
  async remove(id: number) {
    return await this.databaseService.user.delete({
      where: { id }
    });
  }
}
