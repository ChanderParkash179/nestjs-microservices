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

  @EventPattern({ cmd: "FILTER_BY_NAME" })
  filterByName(payload: any) {
    const { name } = payload
    return this.productService.filterByName(name);
  }

  @EventPattern({ cmd: "SORT_AND_PAGINATE" })
  sortAndPaginate(queryParams: any) {
    return this.productService.sortingAndPagination(queryParams);
  }
}
