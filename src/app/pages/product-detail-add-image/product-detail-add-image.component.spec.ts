import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailAddImageComponent } from './product-detail-add-image.component';

describe('ProductDetailAddImageComponent', () => {
  let component: ProductDetailAddImageComponent;
  let fixture: ComponentFixture<ProductDetailAddImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailAddImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailAddImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
