/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: app.module.ts
 * Last modified: 23/05/2023, 08:38
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
import { BrowserModule } from "@angular/platform-browser";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { CommonsModule } from "./modules/commons/commons.module";
import { AppRootComponent } from "./app-root.component";

import { JwtRefreshInterceptor } from "./modules/commons/interceptors/jwt-refresh/jwt-refresh.interceptor";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@NgModule({
    declarations: [
        AppRootComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        CommonsModule,
        BrowserAnimationsModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtRefreshInterceptor, multi: true },
    ],
    bootstrap: [
        AppRootComponent,
    ],
})
export class AppModule {
}
