import {Injectable} from '@angular/core';
import {User} from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

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

  getLogin(): Observable<string | null> {
    return this.getUser().pipe(
      map((user: User | null) => {
        return !!user ? user.email : null;
      })
    );
  }
}
