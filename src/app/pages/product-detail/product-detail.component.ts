import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../classes/Product';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import * as slug from 'slug';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productForm: FormGroup = new FormGroup({
    sku: new FormControl(''),
    brand: new FormControl(''),
    name: new FormControl(''),
    summary: new FormControl(''),
    price: new FormControl(''),
  });
  lockButtons = false;
  previewUrl = 'https://firebasestorage.googleapis.com/v0/b/ecom-template-001.appspot.com/o/uploads%2Fproducts%2Fbacknd-frontndpng?alt=media&token=51e9d358-aeb6-44b9-aed2-2189065067a8';

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.setFormControls();
  }

  private setFormControls(): void {
    const productId: string = this.route.snapshot.params.id;
    if (productId !== 'add') {
      this.firestore.doc<Product>(`products/${productId}`).valueChanges().subscribe(rs => {
        this.productForm = new FormGroup({
          sku: new FormControl(rs.sku),
          brand: new FormControl(rs.brand),
          name: new FormControl(rs.name),
          summary: new FormControl(rs.summary),
          price: new FormControl(rs.price),
        });
      });
    }
  }

  async onSubmit() {
    this.spinner.show();
    this.lockButtons = true;
    const id: string = this.route.snapshot.params.id;
    const product: Product = Object.assign({}, {
      id,
      ...this.productForm.value,
      url: slug(`${this.productForm.value.brand} ${this.productForm.value.name}`, { lower: true })
    });
    await this.firestore.doc<Product>(`products/${product.id}`).set(product);
    this.spinner.hide();
    this.lockButtons = false;
  }

  onChangeTab(eventTab) {
    console.log('change tab to: ', { ev: eventTab });
  }

}
