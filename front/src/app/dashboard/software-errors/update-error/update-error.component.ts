import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/service/app.service';
export interface Error {
  id:number;
  title: string;
  description: string;
  importance_level:string;
  file_path: string;
}
@Component({
  selector: 'app-update-error',
  templateUrl: './update-error.component.html',
  styleUrls: ['./update-error.component.css']
})
export class UpdateErrorComponent {
  errorForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    importance_level: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
  });
  importanceLevels = ['Low', 'Medium', 'High'];
  file: any;
  onFileSelected(event: any) {
    this.file = event.target.files[0];

  }
  constructor(
    public dialogRef: MatDialogRef<UpdateErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Error ,
    private api: AppService
  ) {}
  ngOnInit() {
    this.errorForm.patchValue(this.data)
    console.log(this.data.id)
  }
  async onSubmit() {
    const formData = new FormData();
    formData.append('title', this.errorForm.get('title')?.value ?? '');
    formData.append('description', this.errorForm.get('description')?.value ?? '');
    formData.append('importance_level', this.errorForm.get('importance_level')?.value ?? '');
    formData.append('file_path', this.file);

    await this.api.updateError(formData,this.data.id).subscribe((res: any) => {
      if (res) {
        alert(res['message']);
      } else {
        alert(" error consult");
      }
    })
  }
}
