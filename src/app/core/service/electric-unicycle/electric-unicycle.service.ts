import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, CollectionReference, Query} from '@angular/fire/firestore';
import {fromPromise} from 'rxjs/internal-compatibility';
import {UserService} from '../user/user.service';

const PATH = 'electricUnicycles';

@Injectable({
  providedIn: 'root'
})
export class ElectricUnicycleService {

  private login: string;

  constructor(
    private userService: UserService,
    private afs: AngularFirestore) {
    this.userService.getLogin().subscribe(login => this.login = login);
  }

  list(queryFn?: (ref: CollectionReference) => Query): Observable<ElectricUnicycle[]> {
    return this.afs.collection<ElectricUnicycle>(PATH, queryFn).valueChanges();
  }

  create(euc: Partial<ElectricUnicycle>): Observable<void> {
    const id: string = this.afs.createId();
    return this.save(euc, id);
  }

  update(euc: Partial<ElectricUnicycle>): Observable<void> {
    return this.save(euc, euc.id, euc.createdAt);
  }

  private save(euc: Partial<ElectricUnicycle>, id: string, createdAt?: number) {
    const now: number = new Date().getTime();
    const payload: Partial<ElectricUnicycle> = {
      id,
      ...euc,
      createdAt: createdAt || now,
      updatedAt: now,
      updatedBy: this.login
    };
    if (!payload.contributors) {
      payload.contributors = [];
      payload.createdBy = this.login;
    }
    payload.contributors.push({login: this.login, at: now});
    return fromPromise(this.afs.collection<ElectricUnicycle>(PATH).doc(id).set(payload));
  }

  delete(euc: Partial<ElectricUnicycle>): Observable<void> {
    return fromPromise(this.afs.collection<ElectricUnicycle>(PATH).doc(euc.id).delete());
  }
}
