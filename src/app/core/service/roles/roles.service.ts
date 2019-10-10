import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {UserService} from '../user/user.service';

const reader: Partial<Roles> = {clientId: 'electric-vehicle:reader', clientSecret: 'maep1shxe7hj5j0dlidd2ga4xcxvznjjajh6ejlmmoax'};

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(
    private userService: UserService,
    private afs: AngularFirestore
  ) {
  }

  getRoles(): Observable<Partial<Roles>> {
    return this.userService.getLogin().pipe(
      flatMap((login: string | null) => {
        return this.getRolesFor(login);
      })
    );
  }

  private getRolesFor(login: string | null): Observable<Partial<Roles>> {
    if (!!login) {
      return this.afs.collection<Roles>(`roles`).doc<Roles>(`${login}`).valueChanges().pipe(
        map((roles?: Roles) => {
          return roles || reader;
        })
      );
    } else {
      return of(reader);
    }
  }
}
