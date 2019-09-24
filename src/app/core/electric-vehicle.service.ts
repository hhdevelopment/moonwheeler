import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {flatMap, map, tap} from 'rxjs/operators';
import {SqResponse} from '../model/squidex/sq-response';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};

const squidexURL = 'https://cloud.squidex.io';

@Injectable({
  providedIn: 'root'
})
export class ElectricVehicleService {

  bearer: string;

  constructor(private http: HttpClient) {
  }

  getBearer(): Observable<Bearer> {
    const body = 'grant_type=client_credentials&client_id=electric-vehicle:front&client_secret=qmipp902dtwe1wbtqrjjcnwhv9xg7jglmqe0xdnxpjkx&scope=squidex-api';
    return this.http.post<Bearer>(`${squidexURL}/identity-server/connect/token`, body, httpOptions);
  }

  getUnicycles(): Observable<ElectricUnicycle[]> {
    let bearer$: Observable<string>;
    if (!this.bearer) {
      bearer$ = this.getBearer().pipe(
        map(b => b.access_token),
        tap(b => this.bearer = b)
      );
    } else {
      bearer$ = of(this.bearer);
    }
    return bearer$.pipe(
      flatMap(b => {
        const auth = {
          headers: new HttpHeaders({
            Authorization: `Bearer ${b}`
          })
        };
        return this.http.get<SqResponse<ElectricUnicycle>>(`${squidexURL}/api/content/electric-vehicle/electric-unicycle`, auth);
      }),
      map((r: SqResponse<ElectricUnicycle>) => r.items.map(item => item.data)),
    );
  }
}
