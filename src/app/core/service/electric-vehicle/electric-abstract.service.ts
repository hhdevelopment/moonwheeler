import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, CollectionReference, Query} from '@angular/fire/firestore';
import {fromPromise} from 'rxjs/internal-compatibility';
import {UserService} from '../user/user.service';
import {flatMap} from 'rxjs/operators';
import {User} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export abstract class ElectricAbstractService<T extends ElectricVehicle> {

  abstract getPath(): string;

  constructor(
    private userService: UserService,
    private afs: AngularFirestore) {
  }

  list(queryFn?: (ref: CollectionReference) => Query): Observable<T[]> {
    return this.afs.collection<T>(this.getPath(), queryFn).valueChanges();
  }

  create(euc: Partial<T>): Observable<void> {
    const id: string = this.afs.createId();
    return this.save(euc, id);
  }

  update(euc: Partial<T>): Observable<void> {
    return this.save(euc, euc.id, euc.createdAt);
  }

  private save(euc: Partial<T>, id: string, createdAt?: number): Observable<void> {
    const at: number = new Date().getTime();
    return this.userService.getUser().pipe(
      flatMap((user: User) => {
        const uid: string = user.uid;
        const email: string = user.email || user.providerData[0].email;
        const payload: Partial<T> = {
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
        return fromPromise(this.afs.collection<T>(this.getPath()).doc(id).set(payload));
      })
    );
  }

  delete(ev: Partial<T>): Observable<void> {
    return fromPromise(this.afs.collection<T>(this.getPath()).doc(ev.id).delete());
  }
}
