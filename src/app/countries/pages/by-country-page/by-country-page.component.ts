import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country-interface';

@Component({
	selector: 'countries-by-country-page',
	templateUrl: './by-country-page.component.html',
	styleUrls: ['./by-country-page.component.css']
})
export class ByCountryPageComponent implements OnInit {

	public countries: Country[] = [];
	public country: string = '';

	constructor (private countriesService: CountriesService) {}

	ngOnInit (): void {
		// this.country = this.countriesService.cacheStore.byCountry.country;
		this.country = this.countriesService.cacheStore.byCountry.value;
		this.countries = this.countriesService.cacheStore.byCountry.countries;
	}

	searchByCountry (country: string): void {
		this.countriesService.search ('name', country, '').subscribe (country => this.countries = country);;
		// this.countriesService.searchCountry (country).subscribe (country => this.countries = country);
	}
}