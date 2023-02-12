import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
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
