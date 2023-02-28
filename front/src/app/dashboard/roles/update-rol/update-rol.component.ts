import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/service/app.service';

export interface Role {
  id: any;
  name: any;
  permissions:any;
}

@Component({
  selector: 'app-update-rol',
  templateUrl: './update-rol.component.html',
  styleUrls: ['./update-rol.component.css']
})
export class UpdateRolComponent {
  permissions: any;
  roleData: any
  constructor(
    public dialogRef: MatDialogRef<UpdateRolComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Role ,
    private api: AppService
  ) {}
  updateForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    permissions:new FormControl('', [Validators.required]),
  });
  selectedPermission = new FormControl();
  async onSubmit(){
    this.roleData = this.updateForm.value;
    this.roleData.id = this.data.id;
    await this.api.updateRol(this.roleData).subscribe((res: any) => {
      if (res) {
        alert(res['message']);
      } else {
        alert(" error consult");
      }
    })
  }
  async ngOnInit() {
    this.updateForm.patchValue(this.data)
    this.permissions =this.data.permissions
    this.updateForm.patchValue({
      permissions: this.permissions
    });
    await this.api.permissions().subscribe((res: any) => {
      if (res) {
        this.permissions = res['permission']
      } else {
        alert(" error consult");
      }
    })
  }
}
