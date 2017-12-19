import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundcloudPlaylistComponent } from './soundcloud-playlist.component';

describe('SoundcloudPlaylistComponent', () => {
  let component: SoundcloudPlaylistComponent;
  let fixture: ComponentFixture<SoundcloudPlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoundcloudPlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundcloudPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
