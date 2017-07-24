import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicianFullComponent } from './musician-full.component';

describe('MusicianFullComponent', () => {
  let component: MusicianFullComponent;
  let fixture: ComponentFixture<MusicianFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicianFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicianFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
