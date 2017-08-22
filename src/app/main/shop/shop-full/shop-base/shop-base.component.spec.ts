import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopBaseComponent } from './shop-base.component';

describe('ShopBaseComponent', () => {
  let component: ShopBaseComponent;
  let fixture: ComponentFixture<ShopBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
