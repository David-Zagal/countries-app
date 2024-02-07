import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country-interface';

@Component({
	selector: 'countries-by-capital-page',
	templateUrl: './by-capital-page.component.html',
	styleUrls: ['./by-capital-page.component.css']
})
export class ByCapitalPageComponent implements OnInit {

	public countries: Country[] = [];
	public isLoading: boolean = false;
	public capital: string = '';

	constructor (private countriesService: CountriesService) {}

	ngOnInit (): void {
		this.capital = this.countriesService.cacheStore.byCapital.value;
		// this.capital = this.countriesService.cacheStore.byCapital.capital;
		this.countries = this.countriesService.cacheStore.byCapital.countries;
	}

	searchByCapital (capital: string): void {
		this.isLoading = true;
		this.countriesService.search ('capital', capital, '').subscribe (countries => {
			this.countries = countries;
			this.isLoading = false;
		});
		// this.countriesService.searchCapital (capital).subscribe (countries => {
		// 	this.countries = countries;
		// 	this.isLoading = false;
		// });
	}
}