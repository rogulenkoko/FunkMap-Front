import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileStubComponent } from './mobile-stub.component';

describe('MobileStubComponent', () => {
  let component: MobileStubComponent;
  let fixture: ComponentFixture<MobileStubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileStubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileStubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
