import { TestBed } from '@angular/core/testing';

import { CargarTrabajoService } from './cargar-trabajo.service';

describe('CargarTrabajoService', () => {
  let service: CargarTrabajoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargarTrabajoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
