import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicianInfoComponent } from './musician-info.component';

describe('MusicianInfoComponent', () => {
  let component: MusicianInfoComponent;
  let fixture: ComponentFixture<MusicianInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicianInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicianInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
