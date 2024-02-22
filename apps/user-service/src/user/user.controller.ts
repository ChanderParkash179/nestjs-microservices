import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Headers, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService,
  ) { }

  @UseGuards(AuthGuard('jwt'))
  @Post('/product')
  async addProduct(@Body() product: any, @Headers('authorization') authorization: any) {
    return this.userService.saveProduct(product, authorization);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/products/:id')
  async getProductsById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findProductsByUserId(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/products/filter')
  async filterProductByName(@Query('name') name: any) {
    return this.userService.filterByName(name);
  }

  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}