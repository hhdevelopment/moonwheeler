import {Injectable} from '@angular/core';
import {ElectricAbstractService} from './electric-abstract.service';

@Injectable({
  providedIn: 'root'
})
export class ElectricUnicycleService extends ElectricAbstractService<ElectricUnicycle> {
  getPath(): string {
    return 'electricUnicycles';
  }
}
