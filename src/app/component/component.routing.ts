import { OfficesComponent } from './offices/offices.component';
import { AddOfficeComponent } from './add-office/add-office.component';
import { Routes } from '@angular/router';
import { NgbdpaginationBasicComponent } from './pagination/pagination.component';
import { NgbdAlertBasicComponent } from './alert/alert.component';

import { NgbdDropdownBasicComponent } from './dropdown-collapse/dropdown-collapse.component';
import { NgbdnavBasicComponent } from './nav/nav.component';
import { BadgeComponent } from './badge/badge.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './card/card.component';
import { TableComponent } from './table/table.component';
import { HomeComponent } from './home/home.component';
import { StepsComponent } from './steps/steps.component';


export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'offices',
				component: OfficesComponent
			},
			{
				path: 'newOffice',
				component: AddOfficeComponent
			},
			{
				path: 'table',
				component: TableComponent
			},
			{
				path: 'employee',
				component: CardsComponent
			},
			{
				path: 'pagination',
				component: NgbdpaginationBasicComponent
			},
			{
				path: 'badges',
				component: BadgeComponent
			},
			{
				path: 'alert',
				component: NgbdAlertBasicComponent
			},
			{
				path: 'dropdown',
				component: NgbdDropdownBasicComponent
			},
			{
				path: 'nav',
				component: NgbdnavBasicComponent
			},
			{
				path: 'employees',
				component: ButtonsComponent
			},
			{
				path: 'home',
				component: HomeComponent
			},
			{
				path: 'newemployee',
				component: StepsComponent
			}
		]
	}
];
