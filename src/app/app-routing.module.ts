/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: app-routing.module.ts
 * Last modified: 14/05/2023, 17:07
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
import { RouterModule, Routes, TitleStrategy } from "@angular/router";

import { TemplatePageTitleStrategy } from "./modules/commons/strategies/template-page-title.strategy";
import { NotFoundPageComponent } from "./modules/commons/pages/not-found-page/not-found-page.component";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const routes: Routes = [
    { path: "", loadChildren: () => import("./modules/public/public.module").then(m => m.PublicModule) },
    { path: "login", redirectTo: "auth/login", pathMatch: "full" },
    { path: "register", redirectTo: "auth/register", pathMatch: "full" },
    { path: "auth", loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthModule) },
    { path: "**", component: NotFoundPageComponent, title: "404" },
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule,
    ],
    providers: [
        { provide: TitleStrategy, useClass: TemplatePageTitleStrategy },
    ],
})
export class AppRoutingModule {
}
