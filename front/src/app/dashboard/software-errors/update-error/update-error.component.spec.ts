import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateErrorComponent } from './update-error.component';

describe('UpdateErrorComponent', () => {
  let component: UpdateErrorComponent;
  let fixture: ComponentFixture<UpdateErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
