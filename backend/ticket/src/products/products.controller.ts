import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth-guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/interfaces/decorators/roles.decorators';

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles('USER', 'ADMIN')
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Roles('USER', 'ADMIN')
  @Get()
  async findAll(@Query('page') page: number, @Query('limit') limit: number) {
    const products = await this.productsService.findAll( page, limit );
    return {result : products.length , products};
  }

  @Roles('USER', 'ADMIN')
  @Get()
  getwithQuery(@Query() query: any) {
    return this.productsService.findWithQuery(query);
  }

  @Roles('USER', 'ADMIN')
  @Get('search')
  async search(@Query() query: any) {
    const products =  await this.productsService.search(query);
    return { result: products.length, products };
  }
    @Roles('USER', 'ADMIN')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

    @Roles('USER', 'ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }


  @Roles('USER', 'ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
