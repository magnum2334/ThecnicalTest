import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-create-error',
  templateUrl: './create-error.component.html',
  styleUrls: ['./create-error.component.css']
})
export class CreateErrorComponent {
  file: any;

  constructor(public dialog: MatDialog, private api: AppService) { }
  errorForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    importance_level: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
  });
  importanceLevels = ['Low', 'Medium', 'High'];
  onFileSelected(event: any) {
    this.file = event.target.files[0];

  }
  async onSubmit() {
    const formData = new FormData();
    formData.append('title', this.errorForm.get('title')?.value ?? '');
    formData.append('description', this.errorForm.get('description')?.value ?? '');
    formData.append('importance_level', this.errorForm.get('importance_level')?.value ?? '');
    formData.append('file_path', this.file);

    await this.api.createError(formData).subscribe((res: any) => {
      if (res) {
        alert(" created error software Successfully ");
      } else {
        alert(" error consult");
      }
    })
  }
}
