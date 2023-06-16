import { AracDialogComponent } from './../dialogs/arac-dialog/arac-dialog.component';
import { FotoyukleDialogComponent } from './../dialogs/fotoyukle-dialog/fotoyukle-dialog.component';
import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { MyAlertService } from './../../services/myAlert.service';
import { Sonuc } from './../../models/Sonuc';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from './../../services/api.service';
import { Arac } from './../../models/Arac';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { withModule } from '@angular/core/testing';
import { AracFoto } from 'src/app/models/AracFoto';

@Component({
  selector: 'app-arac',
  templateUrl: './arac.component.html',
  styleUrls: ['./arac.component.css'],
})
export class AracComponent implements OnInit {
  araclar: Arac[];
  displayedColumns = ['aracAdi', 'aracFoto', 'aracNo', 'aracId', 'islemler'];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<AracDialogComponent>;
  fotoDialogRef: MatDialogRef<FotoyukleDialogComponent>;
  ConfirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) {}

  ngOnInit() {
    this.AracListele();
  }
  AracListele() {
    this.apiServis.AracListe().subscribe((d: Arac[]) => {
      this.araclar = d;
      console.log(d);
      this.dataSource = new MatTableDataSource(this.araclar);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  Filtrele(e) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  Ekle() {
    var yeniKayit: Arac = new Arac();
    this.dialogRef = this.matDialog.open(AracDialogComponent, {
      width: '400px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle',
      },
    });
    this.dialogRef.afterClosed().subscribe((d) => {
      if (d) {
        this.apiServis.AracEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.AracListele();
          }
        });
      }
    });
  }
  Duzenle(kayit: Arac) {
    this.dialogRef = this.matDialog.open(AracDialogComponent, {
      width: '400px',
      data: {
        kayit: kayit,
        islem: 'duzenle',
      },
    });
    this.dialogRef.afterClosed().subscribe((d) => {
      kayit.aracAdi = d.aracAdi;
      kayit.aracNo = d.aracNo;

      this.apiServis.AracDüzenle(kayit).subscribe((s: Sonuc) => {
        this.alert.AlertUygula(s);
      });
    });
  }
  Sil(kayit: Arac) {
    this.ConfirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px',
    });
    this.ConfirmDialogRef.componentInstance.dialogMesaj =
      kayit.aracAdi + 'İsimli Araç Silinecektir Onaylıyor Musunuz?';
    this.ConfirmDialogRef.afterClosed().subscribe((d) => {
      this.apiServis.AracSil(kayit.aracId).subscribe((s: Sonuc) => {
        this.alert.AlertUygula(s);
        if (s.islem) {
          this.AracListele();
        }
      });
    });
  }
  FotoGuncelle(kayit: Arac) {
    this.fotoDialogRef = this.matDialog.open(FotoyukleDialogComponent, {
      width: '400px',
      data: kayit,
    });
    this.fotoDialogRef.afterClosed().subscribe((d: AracFoto) => {
      if (d) {
        d.aracId = kayit.aracId;
        this.apiServis.AracFotoGuncelle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.AracListele();
          }
        });
      }
    });
  }
}
