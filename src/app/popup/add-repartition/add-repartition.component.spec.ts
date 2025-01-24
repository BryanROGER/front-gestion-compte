import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRepartitionComponent } from './add-repartition.component';

describe('AddRepartitionComponent', () => {
  let component: AddRepartitionComponent;
  let fixture: ComponentFixture<AddRepartitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRepartitionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRepartitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
