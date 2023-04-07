import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpCommonService } from 'src/app/core/services/httpCommon.service';
import { Product} from '../component/product/product';

@Injectable()
export class ProductService {

    constructor(private httpClient: HttpCommonService,private http: HttpClient) { }
    getAllProducts() {
      return this.httpClient.get('Product/GetProduct');
    }
    addProduct(product: Product) {
      return this.httpClient.post('Product/InsertProduct', product);
    }
    updateProduct(product: Product) {
      return this.httpClient.put('Product/UpdateProduct', product);
    }
    deleteProduct(id?: number) {
      return this.httpClient.delete('Product/DeleteProduct/' + id);
    }
    deleteProducts(products: Product[]) {
      return this.httpClient.post('Product/DeleteProducts',products);
    }

    
    getProductsSmall() {
      return this.http.get<any>('assets/demo/data/products-small.json')
          .toPromise()
          .then(res => res.data as Product[])
          .then(data => data);
  }

  getProducts() {
      return this.http.get<any>('assets/demo/data/products.json')
          .toPromise()
          .then(res => res.data as Product[])
          .then(data => data);
  }

  getProductsMixed() {
      return this.http.get<any>('assets/demo/data/products-mixed.json')
          .toPromise()
          .then(res => res.data as Product[])
          .then(data => data);
  }

  getProductsWithOrdersSmall() {
      return this.http.get<any>('assets/demo/data/products-orders-small.json')
          .toPromise()
          .then(res => res.data as Product[])
          .then(data => data);
  }
}

