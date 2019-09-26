import {Inject, Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {flatMap, map, tap} from 'rxjs/operators';
import {SqResponse} from '../model/squidex/sq-response';
import {APP_BASE_HREF} from '@angular/common';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};


@Injectable({
  providedIn: 'root'
})
export class ElectricVehicleService {

  public static SQUIDEX_URL = 'https://cloud.squidex.io';
  bearer: string;
  locale: string;

  constructor(
    @Inject(APP_BASE_HREF) public baseHref: string,
    private http: HttpClient) {
    this.locale = this.baseHref.replace(/\//g, '').replace(/(-\w\w)$/, (substring: string, ...args: any[]) => {
      return substring.toUpperCase();
    });
  }

  getBearer(): Observable<Bearer> {
    const body = 'grant_type=client_credentials&client_id=electric-vehicle:front&client_secret=qmipp902dtwe1wbtqrjjcnwhv9xg7jglmqe0xdnxpjkx&scope=squidex-api';
    return this.http.post<Bearer>(`${ElectricVehicleService.SQUIDEX_URL}/identity-server/connect/token`, body, httpOptions);
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
            Authorization: `Bearer ${b}`,
            'X-Languages': `${this.locale}`,
            'X-Flatten': 'true'
          })
        };
        return this.http.get<SqResponse<ElectricUnicycle>>(`${ElectricVehicleService.SQUIDEX_URL}/api/content/electric-vehicle/electric-unicycle?seed=${Math.random()}`, auth);
      }),
      tap(r => console.log(r)),
      map((r: SqResponse<ElectricUnicycle>) => r.items.map(item => item.data)),
    );
  }
}
