import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, CollectionReference, Query} from '@angular/fire/firestore';
import {fromPromise} from 'rxjs/internal-compatibility';
import {UserService} from '../user/user.service';
import {flatMap} from 'rxjs/operators';
import {User} from 'firebase';

const PATH = 'electricUnicycles';

@Injectable({
  providedIn: 'root'
})
export class ElectricUnicycleService {

  constructor(
    private userService: UserService,
    private afs: AngularFirestore) {
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

  private save(euc: Partial<ElectricUnicycle>, id: string, createdAt?: number): Observable<void> {
    const at: number = new Date().getTime();
    return this.userService.getUser().pipe(
      flatMap((user: User) => {
        const uid: string = user.uid;
        const email: string = user.email || user.providerData[0].email;
        const payload: Partial<ElectricUnicycle> = {
          id,
          ...euc,
          createdAt: createdAt || at,
          updatedAt: at,
          updatedBy: email,
          updatedById: uid
        };
        if (!payload.contributors) {
          payload.contributors = [];
          payload.createdBy = email;
          payload.createdById = uid;
        }
        payload.contributors.push({email, uid, at});
        return fromPromise(this.afs.collection<ElectricUnicycle>(PATH).doc(id).set(payload));
      })
    );
  }

  delete(euc: Partial<ElectricUnicycle>): Observable<void> {
    return fromPromise(this.afs.collection<ElectricUnicycle>(PATH).doc(euc.id).delete());
  }
}
