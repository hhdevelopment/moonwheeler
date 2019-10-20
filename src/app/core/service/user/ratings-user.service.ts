import {first, flatMap, map} from 'rxjs/operators';
import {User} from 'firebase';
import {Observable, of} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RatingsUserService {

  constructor(
    private afs: AngularFirestore,
    private userService: UserService,
  ) {
  }

  getPath(): string {
    return 'userRatings';
  }

  getRatings() {
    return this.userService.getUser().pipe(
      flatMap((user: User) => {
          return this.getRatingsForUserUid(user.uid);
        }
      )
    );
  }

  getRatingsForUserUid(uid: string) {
    return this.afs.doc<RatingsUser>(`userRatings/${uid}`).valueChanges();
  }

  setRatingForDocument(docId: string, rating: number): Observable<number> {
    const at: number = new Date().getTime();
    let userUid: string;
    let userEmail: string;
    return this.userService.getUser().pipe(
      flatMap((user: User) => {
        userUid = user.uid;
        userEmail = user.providerData[0].email;
        return this.getRatingsForUserUid(userUid);
      }),
      first(),
      flatMap((ratingsUser: RatingsUser) => {
        if (ratingsUser) {
          let old: number;
          if (!!ratingsUser[docId]) {
            old = (ratingsUser[docId] as RatingUser).value;
          }
          ratingsUser[docId] = {value: rating, comment: '', at};
          return fromPromise(this.afs.collection<RatingsUser>(this.getPath()).doc(userUid).update(ratingsUser)).pipe(map(() => old));
        } else {
          ratingsUser = {userUid, userEmail};
          ratingsUser[docId] = {value: rating, comment: '', at};
          return fromPromise(this.afs.collection<RatingsUser>(this.getPath()).doc(userUid).set(ratingsUser)).pipe(map(() => undefined));
        }
      })
    );
  }
}
