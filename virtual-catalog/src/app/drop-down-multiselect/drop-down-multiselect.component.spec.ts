import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownMultiselectComponent } from './drop-down-multiselect.component';

describe('DropDownMultiselectComponent', () => {
  let component: DropDownMultiselectComponent;
  let fixture: ComponentFixture<DropDownMultiselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropDownMultiselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownMultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
