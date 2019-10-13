import {Injectable} from '@angular/core';
import {User} from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import IdTokenResult = firebase.auth.IdTokenResult;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private afAuth: AngularFireAuth,
  ) {
  }


  getUser(): Observable<User | null> {
    return this.afAuth.user;
  }

  getClaims(): Observable<Partial<Claims>> {
    return this.afAuth.idTokenResult.pipe(
      map((idTokenResult: IdTokenResult) => {
        return !!idTokenResult ? idTokenResult.claims as Partial<Claims> : {};
      })
    );
  }

  getEmail(): Observable<string | null> {
    return this.getUser().pipe(
      map((user: User | null) => {
        return !!user ? user.email : null;
      })
    );
  }

  getUid(): Observable<string | null> {
    return this.getUser().pipe(
      map((user: User | null) => {
        return !!user ? user.uid : null;
      })
    );
  }
}
