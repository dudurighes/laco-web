import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserRegister} from '../../pages/register/user-register';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/usuario';

  constructor(private http: HttpClient) {
  }

  registerUser(user: UserRegister): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}
