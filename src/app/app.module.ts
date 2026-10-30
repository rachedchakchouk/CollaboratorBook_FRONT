import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule, LocationStrategy, PathLocationStrategy, } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClient, HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { AuthInterceptor } from "./core/auth.interceptor";
import { Routes, RouterModule } from "@angular/router";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { FullComponent } from "./layouts/full/full.component";

import { NavigationComponent } from "./shared/header/navigation.component";
import { SidebarComponent } from "./shared/sidebar/sidebar.component";

import { Approutes } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SpinnerComponent } from "./shared/spinner.component";

import { AccordionModule } from "primeng/accordion"; //accordion and accordion tab
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DataViewModule } from "primeng/dataview";
import { providePrimeNG } from "primeng/config";
import { definePreset } from "@primeuix/themes";
import Lara from "@primeuix/themes/lara";

/** PrimeNG 18+ theme (replaces the former lara-light-blue CSS file): Lara preset with a blue primary colour. */
const LaraBlue = definePreset(Lara, {
  semantic: {
    primary: {
      50: "{blue.50}",
      100: "{blue.100}",
      200: "{blue.200}",
      300: "{blue.300}",
      400: "{blue.400}",
      500: "{blue.500}",
      600: "{blue.600}",
      700: "{blue.700}",
      800: "{blue.800}",
      900: "{blue.900}",
      950: "{blue.950}",
    },
  },
});

@NgModule({ declarations: [
        AppComponent,
        SpinnerComponent,
        FullComponent,
        NavigationComponent,
        SidebarComponent,
    ],
    bootstrap: [AppComponent], imports: [CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        ConfirmDialogModule,
        DataViewModule,
        AccordionModule,
        RouterModule.forRoot(Approutes, {
            useHash: false,
        })], providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy,
        },
        provideHttpClient(withInterceptorsFromDi()),
        providePrimeNG({ theme: { preset: LaraBlue, options: { darkModeSelector: false } } }),
    ] })
export class AppModule {
}
