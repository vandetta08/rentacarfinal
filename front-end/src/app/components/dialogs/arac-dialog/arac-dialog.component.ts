import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from './../../../services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Arac } from 'src/app/models/Arac';

@Component({
  selector: 'app-arac-dialog',
  templateUrl: './arac-dialog.component.html',
  styleUrls: ['./arac-dialog.component.css']
})
export class AracDialogComponent implements OnInit {
dialogBaslik:string;
islem: string;
frm: FormGroup;
yeniKayit: Arac;
  constructor(
public apiServis:ApiService,
public matDialog:MatDialog,
public frmBuild:FormBuilder,
public dialogRef:MatDialogRef<AracDialogComponent>,
@Inject(MAT_DIALOG_DATA) public data: any

){
  this.islem=data.islem;
  this.yeniKayit=data.kayit;
  if (this.islem == 'ekle') {
    this.dialogBaslik = "Araç Ekle";
  }
  if (this.islem == 'duzenle'){
    this.dialogBaslik="Araç Düzenle"
  }
  this.frm = this.FormOlustur();
}
  ngOnInit() {  
  }
FormOlustur() {
  return this.frmBuild.group({
    aracNo:[this.yeniKayit.aracNo],
    aracAdi:[this.yeniKayit.aracAdi],

  });
}
}

