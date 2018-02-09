import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundcloudPlayerMiniComponent } from './soundcloud-player-mini.component';

describe('SoundcloudPlayerMiniComponent', () => {
  let component: SoundcloudPlayerMiniComponent;
  let fixture: ComponentFixture<SoundcloudPlayerMiniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoundcloudPlayerMiniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundcloudPlayerMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
