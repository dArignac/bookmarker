import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagCreationComponent } from './tag-creation.component';

describe('TagCreationComponent', () => {
  let component: TagCreationComponent;
  let fixture: ComponentFixture<TagCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
