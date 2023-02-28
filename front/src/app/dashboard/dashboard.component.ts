import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppService } from '../service/app.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  permissions: any;

  constructor(private breakpointObserver: BreakpointObserver, private router:Router, private api: AppService, private permissionsService: NgxPermissionsService) {}

  async ngOnInit() {
    let user = JSON.parse(localStorage.getItem('user') ?? '');
    await this.api.userPermissions(user.id_rol).subscribe((res: any) => {
      if (res) {
         this.permissions = res['permissions']
         const permissionsName =  this.permissions.map((per:any) => per.name)
         if(permissionsName){
          this.permissionsService.loadPermissions(permissionsName)
          console.log(this.permissionsService.loadPermissions(permissionsName))
        }
      } else {
        alert(" error consult");
      }
    })
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
  dashboard(){
    this.router.navigate(['dashboard']);
  }
}
