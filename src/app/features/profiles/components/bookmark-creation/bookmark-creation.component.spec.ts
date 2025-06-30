import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkCreationComponent } from './bookmark-creation.component';

describe('BookmarkCreationComponent', () => {
  let component: BookmarkCreationComponent;
  let fixture: ComponentFixture<BookmarkCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarkCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
