import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { NO_PRODUCTS_AVAILABLE_BY_NAME, NO_PRODUCT_AVAILABLE_USER } from '../product-service.message';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
  ) { }

  async create(request: any, id: number): Promise<Product> {

    if (!id) throw new UnauthorizedException();

    const payload: CreateProductDto = {
      name: request.name,
      price: request.price,
      user: id
    };

    const product = this.productRepository.create(payload);
    return await this.productRepository.save(product);
  }

  async findByUserId(id: number): Promise<Product[]> {

    const products = await this.productRepository.find({ where: { user: id } });

    if (!products) throw new NotFoundException(`${NO_PRODUCT_AVAILABLE_USER} - ${id}`);

    return products;
  }

  async filterByName(name: string): Promise<Product[]> {
    const products = await this.productRepository.find({ where: { name: Like(`%${name}%`), } });

    if (!products) throw new NotFoundException(`${NO_PRODUCTS_AVAILABLE_BY_NAME} - ${name}`);

    return products;
  }
}