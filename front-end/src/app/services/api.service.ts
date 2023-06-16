import { AracFoto } from './../models/AracFoto';
import { Kategori } from './../models/Kategori';
import { Arac } from './../models/Arac';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'http://localhost:64534/api/';
  siteUrl = 'http://localhost:64534/';
  constructor(public http: HttpClient) {}

  AracListe() {
    return this.http.get<Arac[]>(this.apiUrl + 'Aracliste');
  }

  AracById(aracId: string) {
    return this.http.get(this.apiUrl + 'aracbyid/' + aracId);
  }

  AracEkle(arc: Arac) {
    return this.http.post(this.apiUrl + 'Aracekle', arc);
  }

  AracDüzenle(arac: Arac) {
    return this.http.put(this.apiUrl + 'aracdüzenle', arac);
  }

  AracSil(aracId: string) {
    return this.http.delete(this.apiUrl + 'aracsil/' + aracId);
  }
  AracFotoGuncelle(aracFoto: AracFoto) {
    return this.http.post(this.apiUrl + 'aracfotoguncelle', aracFoto);
  }
}
