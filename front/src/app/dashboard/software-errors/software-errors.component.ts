import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from 'src/app/service/app.service';
import { environment } from 'src/environments/environment';
import { CreateErrorComponent } from './create-error/create-error.component';
import * as XLSX from 'xlsx';
import { UpdateErrorComponent } from './update-error/update-error.component';



@Component({
  selector: 'app-software-errors',
  templateUrl: './software-errors.component.html',
  styleUrls: ['./software-errors.component.css']
})
export class SoftwareErrorsComponent {
  errors: any;

  constructor( public dialog: MatDialog, private api: AppService) {}
  createError(){
    const dialogRef = this.dialog.open(CreateErrorComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit()
    });
  }
  async ngOnInit() {
    await this.api.errors().subscribe((res: any) => {
      if (res) {
        this.errors = res['errors']
      } else {
        alert(" error consult");
      }
    })
  }
  async pdf(name:any){
    this.descargarPDF(name);
  }
  descargarPDF(nombreArchivo: string) {
    window.open(`${environment.storageUrl}${nombreArchivo}`, '_blank', 'download');
  }
  excel(){
    const worksheet = XLSX.utils.json_to_sheet(this.errors);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'errorsSoftware.xlsx');
  }
  update(error :any){
    const dialogRef = this.dialog.open(UpdateErrorComponent, {
      data: {
        id: error.id,
        title: error.title,
        description: error.description,
        importance_level:error.importance_level,
        file_path: error.file_path,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit()
    });
  }
}
