import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('유저')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  async getUsers(@Res() response) {
    const users = await this.userService.readUsers();
    console.log(users);
    return response.status(HttpStatus.OK).json({ rows: users });
  }

  @Post()
  async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.createUser(createUserDto);
    return response.status(HttpStatus.CREATED).json({
      row: newUser,
    });
  }

  @Put('/:id')
  async updateUser(
    @Res() response,
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const userData = await this.userService.updateUser(userId, updateUserDto);
    return response.status(HttpStatus.OK).json({
      row: userData,
    });
  }
  @Delete('/:id')
  async deleteUser(@Param('id') userId: string) {
    await this.userService.deleteUser(userId);
  }
}
