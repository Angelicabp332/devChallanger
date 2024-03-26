import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryPageComponent } from './components/country-page/country-page.component';
import { SelectCountryPageComponent } from './components/select-country-page/select-country-page.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
    declarations: [
        AppComponent,
        CountryPageComponent,
        SelectCountryPageComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        FormsModule,
        MatChipsModule
    ]
})
export class AppModule { }
