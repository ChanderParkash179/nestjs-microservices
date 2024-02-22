import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, UnauthorizedException, BadRequestException, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CLIENT_PROXY_CREATE, PORT_NUMBER_PRODUCT, decodeToken } from '../user-service.constants';
import { AuthGuard } from '@nestjs/passport';
import { Status } from './enums/user.status';
import { USER_INVALID_ACTIVATION_OR_LOGGED_IN } from '../user-service.message';

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

  @UseGuards(AuthGuard('jwt'))
  @Post('/product')
  async addProduct(@Body() product: any, @Headers('authorization') authorization: any) {
    const { user_id, user_email } = decodeToken(authorization.split(' ')[1])

    const user = await this.userService.findByIdAndEmail(user_id, user_email);

    if (!user) throw new UnauthorizedException();

    if (user.status !== Status.ACTIVE) throw new BadRequestException(USER_INVALID_ACTIVATION_OR_LOGGED_IN)

    const payload = { product, user_id }
    return this.client.send({ cmd: "ADD_PRODUCT" }, payload);
  }
}