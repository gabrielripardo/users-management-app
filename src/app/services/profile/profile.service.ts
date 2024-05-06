import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/models/profile-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private _http: HttpClient
  ) { }

  getAll(): Observable<Profile[]> {
    return this._http.get<Profile[]>(`${environment.API_URL}profiles`);
  }
}
