import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicianBaseComponent } from './musician-base.component';

describe('MusicianBaseComponent', () => {
  let component: MusicianBaseComponent;
  let fixture: ComponentFixture<MusicianBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicianBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicianBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
