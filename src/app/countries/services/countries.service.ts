import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { Country } from '../interfaces/country-interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

	private apiUrl: string = 'https://restcountries.com/v3.1';
	public cacheStore: CacheStore = {
		byCapital: { value: '', countries: [] },
		byCountry: { value: '', countries: [] },
		byRegion: { region: '', countries: [] }
		// byCapital: { capital: '', countries: [] },
		// byCountry: { country: '', countries: [] },
		// byRegion: { region: '', countries: [] }
	};

	constructor (private http: HttpClient) {
		this.loadFromLocalStorage ();
		console.log ('CountriesService init');
	}

	private saveToLocalStorage (): void {
		localStorage.setItem ('cacheStore', JSON.stringify (this.cacheStore));
	}

	private loadFromLocalStorage (): void {
		if (!localStorage.getItem ('cacheStore')) return;
		this.cacheStore = JSON.parse (localStorage.getItem ('cacheStore')!);
	}

	private getCountriesRequest (url: string): Observable<Country[]> {
		return this.http.get<Country[]> (url).pipe (
			catchError ( () => of ([])),
			// delay (2000),
		);
	}

	search (valueUrl: string, value: string, region: Region): Observable<Country[]> {
		const url = `${ this.apiUrl }/${ valueUrl }/${ value }`;
		return this.getCountriesRequest (url).pipe (
			tap (countries => {
				if (valueUrl === 'capital') this.cacheStore.byCapital = { value, countries };
				if (valueUrl === 'name') this.cacheStore.byCountry = { value, countries };
				if (valueUrl === 'region') this.cacheStore.byRegion = { region, countries };
			}),
			tap ( () => this.saveToLocalStorage ()),
		);
	}

	/*searchCapital (capital: string): Observable<Country[]> {
		const url = `${ this.apiUrl }/capital/${ capital }`;
		return this.getCountriesRequest (url).pipe (
			tap (countries => this.cacheStore.byCapital = { capital, countries }),
			tap ( () => this.saveToLocalStorage ()),
		);
	}

	searchCountry (country: string): Observable<Country[]> {
		const url = `${ this.apiUrl }/name/${ country }`;
		return this.getCountriesRequest (url).pipe (
			tap (countries => this.cacheStore.byCountry = { country, countries }),
			tap ( () => this.saveToLocalStorage ())
		);
	}

	searchRegion (region: Region): Observable<Country[]> {
		const url = `${ this.apiUrl }/region/${ region }`;
		return this.getCountriesRequest (url).pipe (
			tap (countries => this.cacheStore.byRegion = { region, countries }),
			tap ( () => this.saveToLocalStorage ())
		);
	}*/

	searchCountryByAlphaCode (code: string): Observable<Country | null> {
		const url = `${ this.apiUrl }/alpha/${ code }`;
		return this.http.get<Country[]> (url).pipe (
			map (countries => countries.length > 0 ? countries[0] : null),
			catchError (() => of(null))
		);
	}
}