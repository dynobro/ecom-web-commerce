import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../classes/Product';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  private productsObserver: Observable<Product[]>;
  productsList: any[];
  constructor(private firestoreService: AngularFirestore) {
    this.productsObserver = this.firestoreService.collection<Product>('products').valueChanges({ idField: 'id' });
  }

  ngOnInit(): void {
    this.productsObserver.subscribe(products => {
      this.productsList = products;
    });
  }



}
