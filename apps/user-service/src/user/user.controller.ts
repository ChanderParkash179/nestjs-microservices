import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CLIENT_PROXY_CREATE, PORT_NUMBER_PRODUCT } from '../user-service.constants';

@Controller('user')
export class UserController {

  private client: ClientProxy;

  constructor(
    private readonly userService: UserService,
  ) {
    this.client = CLIENT_PROXY_CREATE;
  }

  @Post()
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

  @Post('/product/:id')
  addProduct(@Body() product: any, @Param('id', ParseIntPipe) id: number) {

    const payload = { product, id }
    return this.client.send({ cmd: "ADD_PRODUCT" }, payload);
  }
}
