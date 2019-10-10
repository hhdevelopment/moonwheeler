import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, CollectionReference, Query} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

const PATH = 'objects';

@Injectable({
  providedIn: 'root'
})
export class ObjectsService {

  constructor(
    private afs: AngularFirestore) {
  }

  listIpRatings(queryFn?: (ref: CollectionReference) => Query): Observable<string[]> {
    return this.afs.collection(PATH, queryFn).doc<{values: string[]}>('ipRatings').valueChanges().pipe(
      map((obj: {values: string[]}) => {
        return obj.values;
      })
    );
  }

  listBrands(queryFn?: (ref: CollectionReference) => Query): Observable<string[]> {
    return this.afs.collection(PATH, queryFn).doc<{values: string[]}>('brands').valueChanges().pipe(
      map((obj: {values: string[]}) => {
        return obj.values;
      })
    );
  }

  listTireTypes(queryFn?: (ref: CollectionReference) => Query): Observable<string[]> {
    return this.afs.collection(PATH, queryFn).doc<{values: string[]}>('tireTypes').valueChanges().pipe(
      map((obj: {values: string[]}) => {
        return obj.values;
      })
    );
  }

  listBatteryTypes(queryFn?: (ref: CollectionReference) => Query): Observable<string[]> {
    return this.afs.collection(PATH, queryFn).doc<{values: string[]}>('batteryTypes').valueChanges().pipe(
      map((obj: {values: string[]}) => {
        return obj.values;
      })
    );
  }

  listAppConnectionTypes(queryFn?: (ref: CollectionReference) => Query): Observable<string[]> {
    return this.afs.collection(PATH, queryFn).doc<{values: string[]}>('appConnectionTypes').valueChanges().pipe(
      map((obj: {values: string[]}) => {
        return obj.values;
      })
    );
  }
}
