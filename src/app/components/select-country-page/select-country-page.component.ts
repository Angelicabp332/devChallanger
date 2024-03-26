import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../services/country.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-select-country-page',
  templateUrl: './select-country-page.component.html',
  styleUrls: ['./select-country-page.component.css']
})
export class SelectCountryPageComponent {

  country:any
  neghborhod:any
  allContries:any
  flags:any
  leng:any
  languages:any
  currencies:any
  bordersExist:boolean= false
  loading:boolean = true

  constructor(private activatedRoute: ActivatedRoute,private router: Router,
    private CountryService: CountryService,){

  }
  ngOnInit(): void {
   this.CountryService.allCountries().subscribe((resp)=>{
    this.allContries = resp
   })
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.CountryService.searchCountryByAlphaCode( id )),
      )
      .subscribe( country => {
        if ( !country ) return this.router.navigateByUrl('');
        console.log(country);
        this.getNegborhods()
        return this.country = country;
      });
    }

    getNegborhods(){
      this.loading=true
      setTimeout(() => {
        console.log('in neighborhods');
        this.neghborhod = []
          this.flags = []
          this.leng = []
          this.languages = []
          this.currencies = []
        this.neghborhod = this.country.borders;
        this.leng = this.country.languages
         this.languages = Object.keys(this.leng).map(key => this.leng[key]);
         this.currencies = Object.keys(this.country.currencies).map(key => this.country.currencies[key].name);

        if(this.country.borders){
          this.flags = this.neghborhod.map((border: string) => {
            const country = this.allContries.find((country: any) => country.cca3 === border);
            return country ? { flag: country.flags.png, name: country.name.common, cca3: country.cca3} : null;
          });
          console.log(this.flags);
          this.loading=false
        }else{
          this.loading=false
          this.bordersExist = true
          // this.flags =
        }
      }, 1000);

  }

  onRowClicked(country: any) {
    this.router.navigate(['/by', country]);
  }



}
