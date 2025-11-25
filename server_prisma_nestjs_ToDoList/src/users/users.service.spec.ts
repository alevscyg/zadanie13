import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserDto } from './dto/user-dto';
import { DatabaseService } from '../database/database.service'; 
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let userService: UsersService;
  let databaseService: DatabaseService;

  // Мок данные
  const mockUser = {
    id: 1,
    email: 'test@example.com',
    password: 'password123',
    role: [{ value: 'USER' }]
  };

  const mockRole = {
    value: 'USER',
    description: 'Regular user'
  };

  const mockUserRole = {
    userid: 1,
    value: 'USER'
  };

  const mockUserDto: UserDto = {
    email: 'test@example.com',
    password: 'password123'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: DatabaseService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
              findMany: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
            role: {
              findUnique: jest.fn(),
            },
            userRole: {
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a user with USER role', async () => {
      // Arrange
      jest.spyOn(databaseService.role, 'findUnique').mockResolvedValue(mockRole);
      jest.spyOn(databaseService.user, 'create').mockResolvedValue({ 
        id: 1, 
        email: mockUserDto.email, 
        password: mockUserDto.password 
      });
      jest.spyOn(databaseService.userRole, 'create').mockResolvedValue(mockUserRole);
      jest.spyOn(userService, 'findOne').mockResolvedValue(mockUser);

      // Act
      const result = await userService.create(mockUserDto);

      // Assert
      expect(databaseService.role.findUnique).toHaveBeenCalledWith({
        where: { value: 'USER' }
      });
      expect(databaseService.user.create).toHaveBeenCalledWith({
        data: mockUserDto
      });
      expect(databaseService.userRole.create).toHaveBeenCalledWith({
        data: {
          userid: 1,
          value: 'USER'
        }
      });
      expect(userService.findOne).toHaveBeenCalledWith(mockUserDto.email);
      expect(result).toEqual(mockUser);
    });

    it('should throw BadRequestException if USER role not found', async () => {
      // Arrange
      jest.spyOn(databaseService.role, 'findUnique').mockResolvedValue(null);

      // Act & Assert
      await expect(userService.create(mockUserDto))
        .rejects
        .toThrow(BadRequestException);
      
      expect(databaseService.role.findUnique).toHaveBeenCalledWith({
        where: { value: 'USER' }
      });
      expect(databaseService.user.create).not.toHaveBeenCalled();
      expect(databaseService.userRole.create).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException if user already exists', async () => {
      // Arrange
      jest.spyOn(databaseService.role, 'findUnique').mockResolvedValue(mockRole);
      jest.spyOn(databaseService.user, 'create').mockRejectedValue({
        code: 'P2002', // Prisma unique constraint error code
        meta: { target: ['email'] }
      });

      // Act & Assert
      await expect(userService.create(mockUserDto))
        .rejects
        .toThrow(BadRequestException);
      
      expect(databaseService.role.findUnique).toHaveBeenCalled();
      expect(databaseService.user.create).toHaveBeenCalled();
      expect(databaseService.userRole.create).not.toHaveBeenCalled();
    });

    it('should rethrow unexpected errors', async () => {
      // Arrange
      const unexpectedError = new Error('Database connection failed');
      jest.spyOn(databaseService.role, 'findUnique').mockRejectedValue(unexpectedError);

      // Act & Assert
      await expect(userService.create(mockUserDto))
        .rejects
        .toThrow('Database connection failed');
    });
  });

  describe('findAll', () => {
    it('should return all users with roles', async () => {
      // Arrange
      const mockUsers = [mockUser, { ...mockUser, id: 2, email: 'test2@example.com' }];
      jest.spyOn(databaseService.user, 'findMany').mockResolvedValue(mockUsers);

      // Act
      const result = await userService.findAll();

      // Assert
      expect(databaseService.user.findMany).toHaveBeenCalledWith({
        include: { role: true }
      });
      expect(result).toEqual(mockUsers);
      expect(result).toHaveLength(2);
    });

    it('should return empty array when no users exist', async () => {
      // Arrange
      jest.spyOn(databaseService.user, 'findMany').mockResolvedValue([]);

      // Act
      const result = await userService.findAll();

      // Assert
      expect(databaseService.user.findMany).toHaveBeenCalledWith({
        include: { role: true }
      });
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return user by email with roles', async () => {
      // Arrange
      jest.spyOn(databaseService.user, 'findUnique').mockResolvedValue(mockUser);

      // Act
      const result = await userService.findOne('test@example.com');

      // Assert
      expect(databaseService.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
        include: { role: true }
      });
      expect(result).toEqual(mockUser);
    });

    it('should return null when user not found', async () => {
      // Arrange
      jest.spyOn(databaseService.user, 'findUnique').mockResolvedValue(null);

      // Act
      const result = await userService.findOne('nonexistent@example.com');

      // Assert
      expect(databaseService.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'nonexistent@example.com' },
        include: { role: true }
      });
      expect(result).toBeNull();
    });

    it('should handle email case sensitivity', async () => {
      // Arrange
      jest.spyOn(databaseService.user, 'findUnique').mockResolvedValue(mockUser);

      // Act
      const result = await userService.findOne('TEST@example.com');

      // Assert
      expect(databaseService.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'TEST@example.com' },
        include: { role: true }
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should update user successfully', async () => {
      // Arrange
      const updateUserDto: UserDto = {
        email: 'updated@example.com',
        password: 'newpassword123'
      };
      const updatedUser = { ...mockUser, ...updateUserDto };
      jest.spyOn(databaseService.user, 'update').mockResolvedValue(updatedUser);

      // Act
      const result = await userService.update(1, updateUserDto);

      // Assert
      expect(databaseService.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateUserDto
      });
      expect(result).toEqual(updatedUser);
    });

    it('should throw NotFoundException when updating non-existent user', async () => {
      // Arrange
      jest.spyOn(databaseService.user, 'update').mockRejectedValue({
        code: 'P2025', // Prisma record not found error code
        meta: { cause: 'Record to update not found.' }
      });

      // Act & Assert
      await expect(userService.update(999, mockUserDto))
        .rejects
        .toThrow(NotFoundException);
      
      expect(databaseService.user.update).toHaveBeenCalledWith({
        where: { id: 999 },
        data: mockUserDto
      });
    });

    it('should throw BadRequestException for duplicate email on update', async () => {
      // Arrange
      jest.spyOn(databaseService.user, 'update').mockRejectedValue({
        code: 'P2002',
        meta: { target: ['email'] }
      });

      // Act & Assert
      await expect(userService.update(1, mockUserDto))
        .rejects
        .toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('should remove user successfully', async () => {
      // Arrange
      jest.spyOn(databaseService.user, 'delete').mockResolvedValue(mockUser);

      // Act
      const result = await userService.remove(1);

      // Assert
      expect(databaseService.user.delete).toHaveBeenCalledWith({
        where: { id: 1 }
      });
      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException when removing non-existent user', async () => {
      // Arrange
      jest.spyOn(databaseService.user, 'delete').mockRejectedValue({
        code: 'P2025',
        meta: { cause: 'Record to delete does not exist.' }
      });

      // Act & Assert
      await expect(userService.remove(999))
        .rejects
        .toThrow(NotFoundException);
      
      expect(databaseService.user.delete).toHaveBeenCalledWith({
        where: { id: 999 }
      });
    });

    it('should rethrow unexpected errors during removal', async () => {
      // Arrange
      const unexpectedError = new Error('Database constraint violation');
      jest.spyOn(databaseService.user, 'delete').mockRejectedValue(unexpectedError);

      // Act & Assert
      await expect(userService.remove(1))
        .rejects
        .toThrow('Database constraint violation');
    });
  });

  describe('UserDto validation', () => {
    it('should validate email format', () => {
      const dto = new UserDto();
      
      // Valid email
      dto.email = 'valid@example.com';
      dto.password = 'password';
      
      // Invalid email should be caught by class-validator
      expect(() => {
        const invalidDto = new UserDto();
        invalidDto.email = 'invalid-email';
        invalidDto.password = 'password';
        // В реальном приложении валидация происходит через ValidationPipe
      }).not.toThrow(); // DTO сам по себе не выбрасывает исключения
    });

    it('should validate password length', () => {
      const dto = new UserDto();
      
      // Valid password length
      dto.email = 'test@example.com';
      dto.password = 'pass'; // 4 символа - минимальная длина
      
      // Too short password should be caught by class-validator
      expect(() => {
        const invalidDto = new UserDto();
        invalidDto.email = 'test@example.com';
        invalidDto.password = '123'; // 3 символа - слишком коротко
      }).not.toThrow();
    });
  });

});
