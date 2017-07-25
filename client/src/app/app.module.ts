import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule }   from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ProductComponent } from './product/product.component';
import { StarsComponent } from './stars/stars.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HomeComponent } from './home/home.component';

import { ProductService } from './shared/product.service';
import { WebSocketService } from './shared/web-socket.service'
import { FilterPipe } from './pipe/filter.pipe'


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SearchComponent,
    CarouselComponent,
    ProductComponent,
    StarsComponent,
    ProductDetailComponent,
    HomeComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },{
        path: 'product/:id',
        component: ProductDetailComponent
      }
    ])
  ],
  providers: [ProductService, WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
