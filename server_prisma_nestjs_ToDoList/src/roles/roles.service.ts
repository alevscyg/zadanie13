import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { RoleDto } from './dto/role-dto';

@Injectable()
export class RolesService {
    
  constructor(private databaseService: DatabaseService){}

  async create(createRoleDto: RoleDto) {
    return await this.databaseService.role.create({ data: createRoleDto });
  }
    
  async findAll() {
    return await this.databaseService.role.findMany({});
  }
    
  async findOne(value: string) {
    return await this.databaseService.role.findUnique({ where: {value} });
  }
  
  async update(value: string, updateRoleDto: RoleDto) {
    return await this.databaseService.role.update({
      where: {
        value,
      },
      data: updateRoleDto,
    });
  }
    
  async remove(value: string) {
    return await this.databaseService.role.delete({ where: { value } });
  }
}
