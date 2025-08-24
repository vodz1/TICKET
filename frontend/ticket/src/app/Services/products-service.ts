import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl = `http://localhost:3000/products`;
  constructor(private readonly http : HttpClient){}

  createProduct(product: any) {
    return this.http.post(this.baseUrl, product);
  }

  getProducts(page: number = 1, limit: number = 10) {
    return this.http.get(`${this.baseUrl}?page=${page}&limit=${limit}`);
  }

searchProducts(field: string, value: string | number) {
  return this.http.get(`${this.baseUrl}/search`, {
    params: { [field]: value }
  });
}

  getProductById(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  updateProduct(id: string, product: any) {
    return this.http.patch(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
