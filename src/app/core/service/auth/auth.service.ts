import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {auth, User} from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';

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
    const googleAuthProvider = new auth.GoogleAuthProvider();
    googleAuthProvider.addScope('email');
    return this.oAuthLogin(googleAuthProvider);
  }

  githubLogin() {
    return this.oAuthLogin(new auth.GithubAuthProvider());
  }

  facebookLogin() {
    return this.oAuthLogin(new auth.FacebookAuthProvider());
  }

  signOut() {
    this.afAuth.auth.signOut().then();
  }

  private oAuthLogin(provider: auth.AuthProvider) {
    return this.afAuth.auth.signInWithPopup(provider).then((credential: auth.UserCredential) => {
    });
  }
}
