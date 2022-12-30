import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  API_URL = 'http://localhost:8000';
  constructor(private http: HttpClient) {}

  getUser(): Observable<any> {
    return this.http.get(`${this.API_URL}/user`);
  }

  createUser(data: any, file: any): Observable<any> {
    const formData: FormData = new FormData();
    if (file) formData.append('ProfileImage', file, file.name);
    formData.append('data', JSON.stringify(data));
    return this.http.post(`${this.API_URL}/user`, formData);
  }
  updateUser(data: any, file: any, userId: any): Observable<any> {
    const formData: FormData = new FormData();
    if (file) formData.append('ProfileImage', file, file.name);
    formData.append('data', JSON.stringify(data));
    return this.http.put(`${this.API_URL}/user/${userId}`, formData);
  }
  deleteuser(userId: any): Observable<any> {
    return this.http.delete(`${this.API_URL}/user/${userId}`);
  }
}
