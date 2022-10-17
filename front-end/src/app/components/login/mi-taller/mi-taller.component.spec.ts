import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiTallerComponent } from './mi-taller.component';

describe('MiTallerComponent', () => {
  let component: MiTallerComponent;
  let fixture: ComponentFixture<MiTallerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiTallerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiTallerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
