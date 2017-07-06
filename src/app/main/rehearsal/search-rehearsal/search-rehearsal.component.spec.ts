import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRehearsalComponent } from './search-rehearsal.component';

describe('SearchRehearsalComponent', () => {
  let component: SearchRehearsalComponent;
  let fixture: ComponentFixture<SearchRehearsalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchRehearsalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRehearsalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
