import { ApiService } from './../../../services/api.service';
import { Arac } from 'src/app/models/Arac';
import { AracFoto } from './../../../models/AracFoto';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-fotoyukle-dialog',
  templateUrl: './fotoyukle-dialog.component.html',
  styleUrls: ['./fotoyukle-dialog.component.css']
})
export class FotoyukleDialogComponent implements OnInit {
secilenFoto:any;
aracFoto:AracFoto=new AracFoto();
secArac: Arac;
  constructor(
    public fotoDialogRef:MatDialogRef<FotoyukleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
public ApiServis: ApiService
  ) {
    this.secArac=this.data;
   } 

  ngOnInit() {
  }
FotoSec(e){
var fotolar=e.target.files;
var foto = fotolar[0];

var fr=new FileReader();
fr.onloadend=()=>{
  this.secilenFoto=fr.result;
  this.aracFoto.fotoData=fr.result.toString();
  this.aracFoto.fotoUzanti=foto.type;
};
fr.readAsDataURL(foto);
}
}
