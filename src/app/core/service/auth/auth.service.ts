import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {auth, User} from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth
  ) {
    this.user$ = this.afAuth.authState;
  }

  googleLogin() {
    return this.oAuthLogin(new auth.GoogleAuthProvider());
  }

  signOut() {
    this.afAuth.auth.signOut().then();
  }

  private oAuthLogin(provider: auth.AuthProvider) {
    return this.afAuth.auth.signInWithPopup(provider).then((credential: auth.UserCredential) => {
//      console.log(credential.user);
    });
  }
}
