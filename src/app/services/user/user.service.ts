import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private _http: HttpClient
  ) { }


  getAll(): Observable<User[]> {
    return this._http.get<User[]>(`${environment.API_URL}users`)
  }

  // get(user_id: number): Observable<User> {
  //   return this._http.get<User>(`${environment.API_URL}users/${user_id}`)
  // }

  create(userData: User): Observable<User> {
    return this._http.post<User>(`${environment.API_URL}users`, userData)
  }

  update(user_id: number, userData: User): Observable<User> {
    return this._http.put<User>(`${environment.API_URL}users/${user_id}`, userData);
  }

  remove(user_id: number): Observable<User> {
    return this._http.delete<User>(`${environment.API_URL}users/${user_id}`);
  }
}
