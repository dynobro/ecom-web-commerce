import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'firebase/firestore';
import { firestore } from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../../classes/Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  private productsObserver: Observable<Product[]>;
  productsList: Product[];
  constructor(firestoreService: AngularFirestore) {
    this.productsObserver = firestoreService.collection<Product>('products').valueChanges({ idField: 'id' });
  }

  ngOnInit(): void {
    this.productsObserver.subscribe(products => {
      this.productsList = products;
    });
  }

  onSave() { }

  onSelect() { }
}
