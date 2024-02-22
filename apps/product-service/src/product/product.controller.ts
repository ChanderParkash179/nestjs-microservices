import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @MessagePattern({ cmd: "ADD_PRODUCT" })
  create(@Body() payload: any) {
    const { product, user_id } = payload
    return this.productService.create(product, Number(user_id));
  }
}
