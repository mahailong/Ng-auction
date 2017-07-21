import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }  from '@angular/router';
import { Product, Comment, ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product;

  comments: Comment[];

  newRating: number = 5;

  newComment: string = "";

  isCommentHidden: boolean = true;

  constructor(
    private routeInfo: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {

    let productId: number = this.routeInfo.snapshot.params["id"];

    this.product = this.productService.getProduct(productId);

    this.comments = this.productService.getCommentsForProductId(productId)

  }

  addComment() {
    this.comments.unshift({
      "id":this.comments.length,
      "productId":this.product.id,
      "timestamp":new Date().getTime(),
      "user":"小淘气",
      "rating": this.newRating,
      "content": this.newComment
    })
    let sum = this.comments.reduce((sum, comment) => sum + comment.rating, 0)
    this.product.rating = sum / this.comments.length;
    this.newComment = null;
    this.newRating = 5;
    this.isCommentHidden = true;
  }

}
