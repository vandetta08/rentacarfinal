import { FotoyukleDialogComponent } from './components/dialogs/fotoyukle-dialog/fotoyukle-dialog.component';
import { AracDialogComponent } from './components/dialogs/arac-dialog/arac-dialog.component';
import { AracComponent } from './components/arac/arac.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { MyAlertService } from './services/myAlert.service';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from './material.module';
//import { Http2ServerRequest } from 'http2'; -----------------------------------hata veriyor-------------
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    AracComponent,

    //Dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    AracDialogComponent,
    FotoyukleDialogComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
    
  ],
  entryComponents:[
    AlertDialogComponent,
    ConfirmDialogComponent,
    AracDialogComponent,
    FotoyukleDialogComponent
  ],
  providers: [MyAlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
