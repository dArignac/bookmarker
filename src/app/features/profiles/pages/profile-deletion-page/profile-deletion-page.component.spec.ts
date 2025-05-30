import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDeletionPageComponent } from './profile-deletion-page.component';

describe('ProfileDeletionPageComponent', () => {
  let component: ProfileDeletionPageComponent;
  let fixture: ComponentFixture<ProfileDeletionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileDeletionPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileDeletionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
