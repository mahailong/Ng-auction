import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

  products: Product[] = [
    {"id":1,"title":"第一个商品","price":1.99,"rating":3.5,"desc":"这是第一个商品，是我在学习慕课网angular实战时创建的","imgUrl":"http://via.placeholder.com/320x150","categories":["电子产品","硬件设备"]},
    {"id":2,"title":"第二个商品","price":2.99,"rating":4.5,"desc":"这是第二个商品，是我在学习慕课网angular实战时创建的","imgUrl":"http://via.placeholder.com/320x150","categories":["电子产品"]},
    {"id":3,"title":"第三个商品","price":3.99,"rating":2.5,"desc":"这是第三个商品，是我在学习慕课网angular实战时创建的","imgUrl":"http://via.placeholder.com/320x150","categories":["硬件设备"]},
    {"id":4,"title":"第四个商品","price":4.99,"rating":1.5,"desc":"这是第四个商品，是我在学习慕课网angular实战时创建的","imgUrl":"http://via.placeholder.com/320x150","categories":["电子产品","硬件设备"]},
    {"id":5,"title":"第五个商品","price":5.99,"rating":4.5,"desc":"这是第五个商品，是我在学习慕课网angular实战时创建的","imgUrl":"http://via.placeholder.com/320x150","categories":["硬件设备"]},
    {"id":6,"title":"第六个商品","price":6.99,"rating":3.5,"desc":"这是第六个商品，是我在学习慕课网angular实战时创建的","imgUrl":"http://via.placeholder.com/320x150","categories":["图书"]}
  ];

  comments: Comment[] = [
    {"id":1,"productId":1,"timestamp":1500542285004,"user":"张三","rating": 3,"content": "哎呦，不错哦"},
    {"id":2,"productId":1,"timestamp":1500642285004,"user":"李四","rating": 4,"content": "有点意思"},
    {"id":3,"productId":1,"timestamp":1500742285004,"user":"王二麻子","rating": 2,"content": "so so~"},
    {"id":4,"productId":2,"timestamp":1500842285004,"user":"小淘气","rating": 4,"content": "哎呦，不错哦"}
  ];

  constructor() { }

  getAllCategory(): string[] {
    return ["电子产品","硬件设备","图书"]
  }
  getProducts(): Product[]{
    return this.products;
  }

  getProduct(id: number): Product {
    return this.products.find(product => product.id == id);
  }

  getCommentsForProductId(id: number): Comment[] {
    return this.comments.filter(comment => comment.productId == id);
  }
}

export class Product {
  
  id: number;
  title: string;
  price: number;
  rating: number;
  desc: string;
  imgUrl: string;
  categories: string[];

}

export class Comment {

  id: number;
  productId: number;
  timestamp: number;
  user: string;
  rating: number;
  content: string;

}