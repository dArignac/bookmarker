import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDeletionComponent } from './profile-deletion.component';

describe('ProfileDeletionComponent', () => {
  let component: ProfileDeletionComponent;
  let fixture: ComponentFixture<ProfileDeletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileDeletionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileDeletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
