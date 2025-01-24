import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsSettigsComponent } from './tags-settigs.component';

describe('TagsSettigsComponent', () => {
  let component: TagsSettigsComponent;
  let fixture: ComponentFixture<TagsSettigsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagsSettigsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagsSettigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
