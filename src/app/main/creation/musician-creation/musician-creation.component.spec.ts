import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicianCreationComponent } from './musician-creation.component';

describe('MusicianCreationComponent', () => {
  let component: MusicianCreationComponent;
  let fixture: ComponentFixture<MusicianCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicianCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicianCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
