import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectCountryPageComponent } from './components/select-country-page/select-country-page.component';
import { CountryPageComponent } from './components/country-page/country-page.component';

const routes: Routes = [
  {
    path: 'by/:id',
    component: SelectCountryPageComponent,
  },
  {
    path: 'country',
    component: CountryPageComponent
  },
  {
    path: '**',
    redirectTo: 'country'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
