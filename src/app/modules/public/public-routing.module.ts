/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: public-routing.module.ts
 * Last modified: 24/05/2023, 16:28
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

import { PublicRootComponent } from "./public-root.component";

import { PublicStartPageComponent } from "./pages/public-start-page/public-start-page.component";
import { PublicCompanyPageComponent } from "./pages/public-company-page/public-company-page.component";
import { PublicCategoryPageComponent } from "./pages/public-category-page/public-category-page.component";
import { PublicFilteredCompaniesPageComponent } from "./pages/public-filtered-companies-page/public-filtered-companies-page.component";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const routes: Routes = [
    { path: "", component: PublicRootComponent, children: [
        { path: "", component: PublicStartPageComponent, title: "Home", pathMatch: "full" },
        { path: "category/:categoryId",     component: PublicCategoryPageComponent },
        { path: "company/:companyId",       component: PublicCompanyPageComponent },
        { path: "companies",                component: PublicFilteredCompaniesPageComponent, title: "Companies" },
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
export class PublicRoutingModule {
}
