import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {first, flatMap, map} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})
export class DocRatingsService {

  constructor(
    private afs: AngularFirestore,
  ) {
  }

  addRatingToDoc(collection: string, id: string, rate: number, old: number) {
    return this.afs.doc<ElectricVehicle>(`${collection}/${id}`).valueChanges().pipe(
      first(),
      flatMap((doc: ElectricVehicle) => {
        let rating: DocRating;
        if (!!doc.rating) {
          rating = doc.rating;
        } else {
          rating = {users: 0, value: 0};
        }
        const totalRatings: number = (rating.value * rating.users) + rate - (old || 0);
        if (old === undefined) {
          rating.users += 1;
        }
        rating.value = totalRatings / rating.users;
        doc.rating = rating;
        return fromPromise(this.afs.collection<RatingsUser>(collection).doc(id).update(doc));
      })
    );
  }
}
