import {Injectable} from '@angular/core';
import {ElectricAbstractService} from './electric-abstract.service';

@Injectable({
  providedIn: 'root'
})
export class ElectricScooterService extends ElectricAbstractService<ElectricScooter> {
  getPath(): string {
    return 'electricScooters';
  }
}
