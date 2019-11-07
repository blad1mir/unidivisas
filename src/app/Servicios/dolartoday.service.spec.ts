import { TestBed } from '@angular/core/testing'; 
import { DolartodayService } from './dolartoday.service'; //se importa el servicio del que requerimos la información

//Acciones que obtienen la data de la página web
describe('DolartodayService', () => { 
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DolartodayService = TestBed.get(DolartodayService);
    expect(service).toBeTruthy();
  });
});
