import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {flatMap, map, tap} from 'rxjs/operators';
import {APP_BASE_HREF} from '@angular/common';
import {RolesService} from './roles/roles.service';

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
  locale: string;

  constructor(
    @Inject(APP_BASE_HREF) public baseHref: string,
    private rolesService: RolesService,
    private http: HttpClient) {
    this.locale = this.baseHref.replace(/\//g, '').replace(/(-\w\w)$/, (substring: string, ...args: any[]) => {
      return substring.toUpperCase();
    });
  }

  getBearer(): Observable<Bearer> {
    return this.rolesService.getRoles().pipe(
      flatMap((roles: Roles) => {
        const body = `grant_type=client_credentials&client_id=${roles.clientId}&client_secret=${roles.clientSecret}&scope=squidex-api`;
        return this.http.post<Bearer>(`${ElectricVehicleService.SQUIDEX_URL}/identity-server/connect/token`, body, httpOptions);
      })
    );
  }

  getElectricVehicles<T>(content: string): Observable<SqItem<T>[]> {
    return this.getBearer().pipe(
      flatMap(b => {
        const auth = {
          headers: new HttpHeaders({
            Authorization: `Bearer ${b.access_token}`,
            'X-Languages': `${this.locale}`,
            'X-Flatten': 'true'
          })
        };
        return this.http.get<SqResponse<T>>(`${ElectricVehicleService.SQUIDEX_URL}/api/content/electric-vehicle/${content}?seed=${Math.random()}`, auth);
      }),
      tap(_ => console.log(_)),
      map((r: SqResponse<T>) => r.items)
    );
  }

  updateElectricVehicle<T>(content: string, payload: SqItem<T>): Observable<SqItem<T>[]> {
    return this.getBearer().pipe(
      flatMap(b => {
        const auth = {
          headers: new HttpHeaders({
            Authorization: `Bearer ${b.access_token}`,
            'X-Languages': `${this.locale}`,
            'X-Flatten': 'true'
          })
        };
        return this.http.put<SqResponse<T>>(`${ElectricVehicleService.SQUIDEX_URL}/api/content/electric-vehicle/${content}/${payload.id}`, payload, auth);
      }),
      map((r: SqResponse<T>) => r.items)
    );
  }
}
