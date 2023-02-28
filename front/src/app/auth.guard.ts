import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Comprobar si el token está en el local storage
    const token = localStorage.getItem('token');
    if (!token) {
      // Si no hay token, redirigir a la página de inicio de sesión
      this.router.navigate(['/login']);
      return false;
    }
    // Si hay un token, permitir el acceso a la ruta
    return true;
  }

}
