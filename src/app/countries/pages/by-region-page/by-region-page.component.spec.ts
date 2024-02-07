import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByRegionPageComponent } from './by-region-page.component';

describe ('ByRegionPageComponent', () => {
	let component: ByRegionPageComponent;
	let fixture: ComponentFixture<ByRegionPageComponent>;

	beforeEach (() => {
		TestBed.configureTestingModule ({
			declarations: [ByRegionPageComponent]
		});
		fixture = TestBed.createComponent (ByRegionPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges ();
	});

	it ('should create', () => {
		expect (component).toBeTruthy ();
	});
});