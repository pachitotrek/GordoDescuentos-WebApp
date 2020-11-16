import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Global } from './global';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public url: string;

  constructor(private http: HttpClient) {
    this.url = Global.url;
  }


  crearCategoria(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'addcategoria', data, { headers: headers });
  }
  updateCategoria(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'updatecategoria', data, { headers: headers });
  }
  deleteCategoria(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'deletecategoria', data, { headers: headers });
  }
  GetCategoria(): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getcategorias', { headers: headers });
  }
  crearLocation(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'addlocation', data, { headers: headers });
  }
  updateLocation(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'updatelocation', data, { headers: headers });
  }
  deleteLocation(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'deletelocation', data, { headers: headers });
  }
  GetLocations(): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getlocations', { headers: headers });
  }

  //=============================CUPONES========================================
  crearCupon(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'addcupon', data, { headers: headers });
  }
  editarCupon(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'editcupon', data, { headers: headers });
  }
  GetCupones(a?, b?): Observable<any> {
    let cat = "";
    let loc = "";
    (a) ? (cat = `?categoria=${a}`) : "";
    (b) ? (loc = `&location=${b}`) : "";

    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getcupons/' + cat + loc, { headers: headers });
  }
  Getcupon(id): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getcupon/'+id, { headers: headers });
  }
  setComentario(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'addcomentario', data, { headers: headers });
  }
  Getcomentarios(id): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getcomentarios/'+id, { headers: headers });
  }
  deletecomentario(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'deletecomentario', data, { headers: headers });
  }

  //=======================GETPUBLICIDAD===================================

  Getpublicidad(): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getpublicidad', { headers: headers });
  }
  crearPublcidad(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'addpublicidad', data, { headers: headers });
  }
  updatePublicidad(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'updatepublicidad', data, { headers: headers });
  }
  deletePublicidad(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'deletepublicidad', data, { headers: headers });
  }

  





}
