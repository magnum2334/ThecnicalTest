import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from 'src/app/service/app.service';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users!: any[];


  constructor( public dialog: MatDialog, private api: AppService) {}
  async ngOnInit() {
    this.api.users().subscribe((res: any) => {
      if (res) {
        this.users = res['users'];
      } else {
        alert("Error Consult");
      }
    })
  }
  CreateUser(){
    const dialogRef = this.dialog.open(CreateComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit()
    });

  }
  edit(user:any){
    const dialogRef = this.dialog.open(UpdateComponent,{
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        id_rol: user.id_rol,
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit()
    });
  }
  status(user:any){
    this.api.userstatus(user, user.id).subscribe((res: any) => {
      if (res) {
        alert(res['message']);
        this.ngOnInit()
      } else {
        alert("eror update status");
      }
    })
  }
  getStatusClass(status: boolean): string {
    return status ? 'btn-success ' : 'btn-danger';
  }
}
