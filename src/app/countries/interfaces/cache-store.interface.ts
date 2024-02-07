import { Country } from "./country-interface";
import { Region } from "./region.type";

export interface CacheStore {
	byCapital: ValorCountries;
	byCountry: ValorCountries;
	byRegion: RegionCountries;
}

export interface ValorCountries {
	value: string;
	// capital?: string;
	// country?: string;
	countries: Country[];
}

export interface RegionCountries {
	region: Region;
	countries: Country[];
}