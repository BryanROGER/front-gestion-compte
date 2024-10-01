import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendTable } from './spend-table';

describe('TableauRecapMoisComponent', () => {
  let component: SpendTable;
  let fixture: ComponentFixture<SpendTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpendTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpendTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
