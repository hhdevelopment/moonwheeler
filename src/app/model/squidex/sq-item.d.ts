import {SqStatusValue} from './sq-object';

interface SqItem<T> {
  _links: any;
  created: Date;
  createdBy: string;
  data: T;
  id: string;
  isPending: boolean;
  lastModified: Date;
  lastModifiedBy: string;
  status: SqStatusValue;
  statusColor: string;
  version: number;
}
