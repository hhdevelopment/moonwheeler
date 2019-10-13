import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireStorage, AngularFireStorageReference} from '@angular/fire/storage';
import {UserService} from '../user/user.service';
import {flatMap, map} from 'rxjs/operators';
import {User} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(
    private userService: UserService,
    private afStorage: AngularFireStorage,
  ) {
  }

  public uploadFile(path: string, file: File): Observable<number> {
    const ref: AngularFireStorageReference = this.afStorage.ref(path);
    return this.userService.getUser().pipe(
      flatMap((user: User) => {
        const metadata: any = {
          createdBy: user.email,
          createdById: user.uid,
          type: file.type,
          name: file.name
        };
        return ref.put(file, metadata).percentageChanges();
      })
    );
  }

  public uploadFiles2(files: { [key: string]: File }): { [key: string]: Observable<number> } {
    const status: { [key: string]: Observable<number> } = {};
    Object.keys(files).forEach((id: string) => {
      const file: File = files[id];
      status[id] = this.uploadFile(id, file);
    });
    return status;
  }

  public uploadFiles(files: { [key: string]: File }): Observable<{ [key: string]: Observable<number> }> {
    const status: { [key: string]: Observable<number> } = {};
    return this.userService.getUser().pipe(
      map((user: User) => {
          Object.keys(files).forEach((id: string) => {
            const file: File = files[id];
            const ref: AngularFireStorageReference = this.afStorage.ref(id);
            const metadata: any = {
              createdBy: user.email,
              createdById: user.uid,
              type: file.type,
              name: file.name
            };
            status[id] = ref.put(file, metadata).percentageChanges();
          });
          return status;
        }
      )
    );
  }
}
