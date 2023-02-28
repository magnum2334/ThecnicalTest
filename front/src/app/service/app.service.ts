import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  register(data: any) {
    return this.http.post(`${environment.baseUrl}register`, data);
  }
  login(data: any) {
    return this.http.post(`${environment.baseUrl}login`, data);
  }
  logout(data: any) {
    return this.http.post(`${environment.baseUrl}logout`, data);
  }
  createuser(data: any) {
    return this.http.post(`${environment.baseUrl}register`, data);
  }
  updateuser(data: any, id:any) {
    return this.http.put(`${environment.baseUrl}updateuser/${id}`, data);
  }

  users() {
    return this.http.get(`${environment.baseUrl}users`);
  }
  userstatus(data: any, id:any) {
    return this.http.put(`${environment.baseUrl}userstatus/${id}`, data);
  }
  createRol(data: any) {
    return this.http.post(`${environment.baseUrl}createRol`, data);
  }
  updateRol(data: any) {
    return this.http.put(`${environment.baseUrl}updateRol`, data);
  }
  createPermission(data: any) {
    return this.http.post(`${environment.baseUrl}createPermission`, data);
  }
  updatePermission(data: any) {
    return this.http.put(`${environment.baseUrl}updatePermission`, data);
  }
  permissions() {
    return this.http.get(`${environment.baseUrl}permissions`);
  }

  userPermissions(id:any) {
    return this.http.get(`${environment.baseUrl}userPermissions/${id}`);
  }
  roles(){
    return this.http.get(`${environment.baseUrl}roles`);
  }
  createError(data:any){
    return this.http.post(`${environment.baseUrl}createError`, data);
  }
  updateError(data: any, id:any){
    return this.http.put(`${environment.baseUrl}updateError/${id}`, data);
  }
  // pdf(name:any){
  //   return this.http.get(`${environment.baseUrl} ${name}`);
  // }

  errors(){
    return this.http.get(`${environment.baseUrl}errors`);
  }

}
