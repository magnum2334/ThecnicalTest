import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/service/app.service';

export interface Permission {
  name: any;
}
@Component({
  selector: 'app-update-permission',
  templateUrl: './update-permission.component.html',
  styleUrls: ['./update-permission.component.css']
})
export class UpdatePermissionComponent {
  permissions: any;
  constructor(
    public dialogRef: MatDialogRef<UpdatePermissionComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Permission ,
    private api: AppService
  ) {}
  updateForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
  });
  async ngOnInit() {
    
    this.updateForm.patchValue(this.data)
    await this.api.permissions().subscribe((res: any) => {
      if (res) {
        this.permissions = res['permission']
      } else {
        alert(" error consult");
      }
    })
  }
  onSubmit(){
    this.api.updatePermission(this.updateForm.value).subscribe((res: any) => {
      if (res) {
        alert(res['message']);
      } else {
        alert(" error en la consulta");
      }
    })
  }
}
