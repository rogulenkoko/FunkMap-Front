import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStudioComponent } from './search-studio.component';

describe('SearchStudioComponent', () => {
  let component: SearchStudioComponent;
  let fixture: ComponentFixture<SearchStudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchStudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchStudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
