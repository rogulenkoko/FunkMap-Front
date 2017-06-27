import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMusicianComponent } from './search-musician.component';

describe('SearchMusicianComponent', () => {
  let component: SearchMusicianComponent;
  let fixture: ComponentFixture<SearchMusicianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMusicianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMusicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
