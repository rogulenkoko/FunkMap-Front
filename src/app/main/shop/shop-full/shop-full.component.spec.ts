import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopFullComponent } from './shop-full.component';

describe('ShopFullComponent', () => {
  let component: ShopFullComponent;
  let fixture: ComponentFixture<ShopFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
