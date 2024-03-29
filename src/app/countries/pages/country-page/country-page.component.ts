import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country-interface';

@Component({
	selector: 'countries-country-page',
	templateUrl: './country-page.component.html',
	styleUrls: ['./country-page.component.css']
})
export class CountryPageComponent implements OnInit {

	public country?: Country;

	constructor (private activatedRoute: ActivatedRoute,
		private router: Router,
		private countriesService: CountriesService,
	) {}

	ngOnInit (): void {
		this.activatedRoute.params.pipe (
			switchMap (({ code }) => this.countriesService.searchCountryByAlphaCode (code)),
		).subscribe (country => {
			if (!country) return this.router.navigateByUrl ('');

			return this.country = country;
		});
		// this.activatedRoute.params.subscribe (({ code }) => this.searchCountry (code) );
	}

	// searchCountry (code: string) {
	// 	this.countriesService.searchCountryByAlphaCode (code).subscribe (country => console.log (country));
	// }
}