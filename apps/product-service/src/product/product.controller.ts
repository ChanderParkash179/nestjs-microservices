import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @EventPattern({ cmd: "ADD_PRODUCT" })
  create(payload: any) {
    const { product, user_id } = payload
    return this.productService.create(product, Number(user_id));
  }

  @EventPattern({ cmd: "LIST_BY_USERID" })
  findByUserId(payload: any) {
    const { id } = payload
    return this.productService.findByUserId(Number(id));
  }
}
