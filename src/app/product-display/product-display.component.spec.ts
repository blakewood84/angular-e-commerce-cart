import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing'
import { ProductDisplayComponent } from './product-display.component';
import { ProductApiService } from '../services/product-api.service';

describe('ProductDisplayComponent', () => {
  let component: ProductDisplayComponent;
  let fixture: ComponentFixture<ProductDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ ProductDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('service should run', () => {
    const service = TestBed.inject(ProductApiService);
    expect(service).toBeTruthy();
  })

  it('database should connect, getProducts() should work', () => {
    const service = TestBed.inject(ProductApiService);
    expect(service.getProducts()).toBeTruthy();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
