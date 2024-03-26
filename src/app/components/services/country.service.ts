import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private apiUrl: string = 'https://restcountries.com/v3.1'

  constructor( private http: HttpClient) { }

  //all countries
  allCountries(): Observable<any>{
    const url = `${this.apiUrl}/all`;
    return this.http.get(url)
      .pipe(
        catchError( () => of([]) )
      );
  }


  searchCountryByAlphaCode( code: string ): Observable<any> {

    const url = `${ this.apiUrl }/alpha/${ code }`;

    return this.http.get<any>( url )
      .pipe(
        map( countries => countries.length > 0 ? countries[0]: null ),
        catchError( () => of(null) )
      );
  }

}
