import { Component, ViewChild } from '@angular/core';
import { CountryService } from '../services/country.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { LowerCasePipe } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.css']
})
export class CountryPageComponent {

  public countries : any = [];
  allContries: any = [];
  textInput:string = ''
  // oprimido:boolean = false
  // textchip:string = ''
  textchip: string[] = [];
  oprimido: { [key: string]: boolean } = {};
  sortBy = ['name','population','area','region']
  regionBy = ['americas','antarctic','africa','asia','europe','oceania']
  selectedStatus: any;
  loading:boolean = true
  times = new Array(6);
  noFound:boolean = true

  constructor(private countryServices:CountryService, private router: Router){}

  ngOnInit(): void {

  setTimeout(() => {
    this.countryServices.allCountries().subscribe((resp)=>{
      resp.forEach((element: any) => {
        this.countries.push(element)
      });
      this.allContries = this.countries
      this.countries.sort((a: any, b: any) => b.population - a.population);
      this.loading = false
    })
  }, 500);

  }

    onRowClicked(country: any) {
      this.router.navigate(['/by', country.cca3]);
    }

    searchActive(search:string){
      this.textchip=[]
      for (let key in this.oprimido) {
        this.oprimido[key] = false;
      }
    if(search.length == 0 ){
      this.countries = this.allContries
    }
    if(search.length !== 0 || this.countries.length === 0){
      this.countries = []
      this.countries = this.allContries.filter((country:any) =>
      (country.name.common.toLowerCase().includes(search))||
      (country.region && country.region.toLowerCase().includes(search)) ||
      (country.subregion && country.subregion.toLowerCase().includes(search))
      );
      this.noFound = true
    }if(this.countries.length == 0){
      this.noFound = false
    }

  }

  searchByRegion(search:string){
    this.textInput = ''
    console.log(this.textchip);

    if (search.length !== 0) {
      if (this.textchip.includes(search)) {
        this.textchip = this.textchip.filter(chip => chip !== search);
        this.oprimido[search] = false;
      } else {
        this.textchip.push(search);
        this.oprimido[search] = true;
      }
      if (this.textchip.length === 0) {
        this.countries = this.allContries;
      } else{
        this.countries = this.allContries.filter((country:any) =>
          this.textchip.some(chip => country.region && country.region.toLowerCase().includes(chip))
        );
      }
    }

  }

  sorter(text:any){
    console.log("text",text.value);

    if(text.value === "name"){
      this.countries.sort((a: any, b: any) => {
        if (a.name.common < b.name.common) {
          return -1;
        }
        if (a.name.common > b.name.common) {
          return 1;
        }
        return 0;
      });
    }else if (text.value === "population") {
      this.countries.sort((a: any, b: any) => b.population - a.population);
    }else if (text.value === "area") {
      this.countries.sort((a: any, b: any) => b.area - a.area);
    }else if (text.value === "region") {
      this.countries.sort((a: any, b: any) => {
        if (a.region < b.region) {
          return -1;
        }
        if (a.region > b.region) {
          return 1;
        }
        return 0;
      });
    }

  }

  getStatus(status:any){
    this.textchip=[]
    for (let key in this.oprimido) {
        this.oprimido[key] = false
    }

    this.countries=[]

    if(status.value === "member"){
      this.countries = this.allContries.filter((country:any) => (country.status.toLowerCase().includes("officially-assigned")))
    }
    else if(status.value == "nomember"){
      this.countries = this.allContries.filter((country:any) => (country.status.toLowerCase().includes("user-assigned")))
    }
  }

  resetStatus(){
      this.selectedStatus = null;
  }


}
