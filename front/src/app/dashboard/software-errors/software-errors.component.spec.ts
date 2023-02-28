import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareErrorsComponent } from './software-errors.component';

describe('SoftwareErrorsComponent', () => {
  let component: SoftwareErrorsComponent;
  let fixture: ComponentFixture<SoftwareErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoftwareErrorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoftwareErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
