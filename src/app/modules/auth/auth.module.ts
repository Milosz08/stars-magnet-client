/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: auth.module.ts
 * Last modified: 23/05/2023, 09:53
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

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbAlert } from "@ng-bootstrap/ng-bootstrap";

import { AuthRootComponent } from "./auth-root.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { CommonsModule } from "../commons/commons.module";

import { AuthLoginPageComponent } from "./pages/auth-login-page/auth-login-page.component";
import { AuthRegisterPageComponent } from "./pages/auth-register-page/auth-register-page.component";
import { AuthAddCompanyPageComponent } from "./pages/auth-add-company-page/auth-add-company-page.component";
import { AuthAfterAddedCompanyPageComponent } from "./pages/auth-after-added-company-page/auth-after-added-company-page.component";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@NgModule({
    declarations: [
        AuthRootComponent,
        // pages
        AuthLoginPageComponent,
        AuthRegisterPageComponent,
        AuthAddCompanyPageComponent,
        AuthAfterAddedCompanyPageComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        CommonsModule,
        AuthRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbAlert,
    ],
})
export class AuthModule {
}
