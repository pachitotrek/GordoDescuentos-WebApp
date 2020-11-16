import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Global } from './global';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Events } from '@ionic/angular';
import { LocalStorageService } from './local-storage.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: string;
  token: String;
  usuario: string;
  isOpen: boolean;
  status$= new EventEmitter<Boolean>();

  public estado: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient, private events: Events, private local:LocalStorageService) {
    this.url = Global.url;
    this.cargarStorage();  
  }

  googleAuth(token): Observable<any> {
    let data = JSON.stringify({ token: token });
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'loging', data, { headers: headers }).pipe(map((resp:any)=>{        
      this.local.SaveStorage('usuario',resp.usuarioDB);
      this.local.SaveStorage('token',resp.token);
      this.cargarStorage();
      this.status$.emit(true);     
      return resp.ok;
    }));
    
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));  
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  Logeado() {
    return (this.token.length > 5) ? true : false;
  }




  logout() {
    localStorage.clear();
    this.cargarStorage();
    this.status$.emit(false);
  }


  checkEmail(email: String) {

    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.get(this.url + 'check/' + email, { headers: headers });

  }

  login(datos) {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'login', data, { headers: headers }).pipe( map((resp:any)=>{
      localStorage.setItem('usuario', JSON.stringify(resp.usuarioDB));
      localStorage.setItem('token', resp.token);
      return resp.ok;
    }));
  }

  update(datos){
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'editarUsuario', data, { headers: headers });
  }

  register(datos) {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'register', data, { headers: headers });
  }
  









}
