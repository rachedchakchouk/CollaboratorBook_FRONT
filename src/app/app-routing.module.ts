import { UpdateProfileComponent } from "./component/autentification/update-profile/update-profile.component";
import { SignupComponent } from "./component/autentification/signup/signup.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SigninComponent } from "./component/autentification/signin/signin.component";

import { FullComponent } from "./layouts/full/full.component";
import { AuthGuard } from "./core/auth.guard";

export const Approutes: Routes = [
  { path: "", component: SigninComponent, pathMatch: "full" },

  
  {
    path: "signup",
    component: SignupComponent,
    loadChildren: () =>
      import("./component/autentification/authentification.module").then(
        (m) => m.AuthentificationModule
      ),
  },
  {
    path: "update-profile/:id",
    component: UpdateProfileComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./component/autentification/authentification.module").then(
        (m) => m.AuthentificationModule
      ),
  },
  {
    path: "singnin",
    component: SigninComponent,
    loadChildren: () =>
      import("./component/autentification/authentification.module").then(
        (m) => m.AuthentificationModule
      ),
  },

  {
    path: "",
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "/dashboard", pathMatch: "full" },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
      {
        path: "about",
        loadChildren: () =>
          import("./about/about.module").then((m) => m.AboutModule),
      },
      {
        path: "component",
        loadChildren: () =>
          import("./component/component.module").then(
            (m) => m.ComponentsModule
          ),
      },

      {
        path: "contract",
        loadChildren: () =>
          import("./contrat/contrat/contrat.module").then((m) => m.ContratModule),
      }


    ],
  },
  {
    path: "**",
    redirectTo: "/starter",
  },
];
