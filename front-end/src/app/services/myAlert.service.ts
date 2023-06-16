import { AlertDialogComponent } from './../components/dialogs/alert-dialog/alert-dialog.component';
import { Sonuc } from './../models/Sonuc';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyAlertService {
    AlertDialogRef: MatDialogRef<AlertDialogComponent>;

  constructor(
    public matDialog: MatDialog
  ) { }

  AlertUygula(s: Sonuc) {
    var baslik = "";
    if (s.islem) {
      baslik = "İşlem Tamam";
    } else {
      baslik = "Hata";
    }
    this.AlertDialogRef = this.matDialog.open(AlertDialogComponent, {
      width: '300px'
    });

    this.AlertDialogRef.componentInstance.dialogBaslik = baslik;
    this.AlertDialogRef.componentInstance.dialogMesaj = s.mesaj;
    this.AlertDialogRef.componentInstance.dialogIslem = s.islem;

    this.AlertDialogRef.afterClosed().subscribe(d => {
      this.AlertDialogRef = null;
    });
  }
}
