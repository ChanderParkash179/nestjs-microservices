import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { EventPattern } from '@nestjs/microservices';

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
