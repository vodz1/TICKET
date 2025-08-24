import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}
  create(createProductDto: CreateProductDto) {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(page : number , limit : number) {
    if(!page) page = 1;
    if(!limit) limit = 10;
    const skip = (page - 1) * limit;

    const products = await this.productModel.find().skip(skip).limit(limit).exec();
    return products;
  }

  async findWithQuery(query : any){
    return await this.productModel.find(query).exec();
  }


  async search(query : any){
    console.log('Raw Query: ', query);
    const searchingQuery = {}
    if(query.name) searchingQuery['name'] = { $regex:`^${query.name}`, $options: 'i' };
    if(query.description) searchingQuery['description'] = { $regex:`^${query.description}`, $options: 'i' };
    if(query.price) searchingQuery['price'] = query.price;

    console.log('Searching Query: ', searchingQuery);
    if(searchingQuery['name'] || searchingQuery['description'] || searchingQuery['price']) {
      const products =  await this.findWithQuery(searchingQuery);
      if(!products) throw new Error('No products found');
      return products;
    }
  }


  async findOne(id: string) {
    return await this.productModel.findById(id).exec();
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.productModel.findByIdAndUpdate(id, updateProductDto).exec();
  }

  async remove(id: string) {
    return await this.productModel.findByIdAndDelete(id).exec();
  }
}
