import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroOrganizacionesComponent } from './registro-organizaciones.component';

describe('RegistroOrganizacionesComponent', () => {
  let component: RegistroOrganizacionesComponent;
  let fixture: ComponentFixture<RegistroOrganizacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroOrganizacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroOrganizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
