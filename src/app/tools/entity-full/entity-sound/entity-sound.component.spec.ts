import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitySoundComponent } from './entity-sound.component';

describe('EntitySoundComponent', () => {
  let component: EntitySoundComponent;
  let fixture: ComponentFixture<EntitySoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntitySoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitySoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
