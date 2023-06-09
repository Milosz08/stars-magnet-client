/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: auth-routing.module.ts
 * Last modified: 23/05/2023, 09:27
 * Project name: stars-magnet-client
 *
 * Licensed under the MIT license; you may not use this file except in compliance with the License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * THE ABOVE COPYRIGHT NOTICE AND THIS PERMISSION NOTICE SHALL BE INCLUDED IN ALL COPIES OR
 * SUBSTANTIAL PORTIONS OF THE SOFTWARE.
 *
 * The software is provided "as is", without warranty of any kind, express or implied, including but not limited
 * to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event
 * shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an
 * action of contract, tort or otherwise, arising from, out of or in connection with the software or the use
 * or other dealings in the software.
 */

import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { AuthRootComponent } from "./auth-root.component";

import { canActivateNonLogged } from "../commons/guards/non-logged.guard";
import { canActivateCompanyCredentials } from "./guards/after-pass-company-guard.service";

import { AuthLoginPageComponent } from "./pages/auth-login-page/auth-login-page.component";
import { AuthCompanyLoginPageComponent } from "./pages/auth-company-login-page/auth-company-login-page.component";
import { AuthRegisterPageComponent } from "./pages/auth-register-page/auth-register-page.component";
import { AuthAddCompanyPageComponent } from "./pages/auth-add-company-page/auth-add-company-page.component";
import { AuthResetTokenPageComponent } from "./pages/auth-reset-token-page/auth-reset-token-page.component";
import { AuthCompanyCredentialsPageComponent } from "./pages/auth-company-credentials-page/auth-company-credentials-page.component";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const routes: Routes = [
    { path: "", component: AuthRootComponent, canActivate: [ canActivateNonLogged ], children: [
        { path: "", redirectTo: "login", pathMatch: "full" },
        { path: "login",                component: AuthLoginPageComponent,                  title: "Login" },
        { path: "company-login",        component: AuthCompanyLoginPageComponent,           title: "Company login" },
        { path: "register",             component: AuthRegisterPageComponent,               title: "Register" },
        { path: "add-company",          component: AuthAddCompanyPageComponent,             title: "Add company" },
        { path: "reset-token",          component: AuthResetTokenPageComponent,             title: "Reset token" },
        { path: "company-credentials",  component: AuthCompanyCredentialsPageComponent,     title: "Credentials", canActivate: [ canActivateCompanyCredentials ] },
    ]},
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class AuthRoutingModule {
}
