import {SqStatus} from './sq-status';
import {SqItem} from './sq-item';

interface SqResponse<T> {
  _links: any;
  items: SqItem<T>[];
  statuses: SqStatus[];
  total: number;
}
