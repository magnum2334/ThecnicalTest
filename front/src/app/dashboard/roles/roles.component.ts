import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from 'src/app/service/app.service';
import { CreatePermissionComponent } from './create-permission/create-permission.component';
import { CreateRolComponent } from './create-rol/create-rol.component';
import { UpdatePermissionComponent } from './update-permission/update-permission.component';
import { UpdateRolComponent } from './update-rol/update-rol.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
 
export class RolesComponent {
  permissions:any = [];
  roles: any = [];
  constructor( public dialog: MatDialog, private api: AppService) {}

  ngOnInit() {
    this.api.permissions().subscribe((res: any) => {
      if (res) {
        this.permissions = res['permission']; 
      } else {
        alert(" error consult");
      }
    })
    this.api.roles().subscribe((res: any) => {
      if (res) {
        this.roles = res['roles']; 
      } else {
        alert(" error consult");
      }
    })
  }
  createRol(){
    const dialogRef = this.dialog.open(CreateRolComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit()
    });
  }
  
  createPermission(){
    const dialogRef = this.dialog.open(CreatePermissionComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit()
    });
  }
  edit(permission:any){
    const dialogRef = this.dialog.open(UpdatePermissionComponent,{
      data: {
        id: permission.id,
        name:permission.name
      },
    }
    );

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit()
    });
  }
  status(permission:any){
   
  }
 
  getStatusClass(status: boolean): string {
    return status ? 'btn-success ' : 'btn-danger';
  }
  rolEdit(role: any){
    const dialogRef = this.dialog.open(UpdateRolComponent,{
      data: {
        id: role.id,
        name:role.name,
        permissions:role.permissions,
      },
    }
    );
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit()
    });
  }
}
