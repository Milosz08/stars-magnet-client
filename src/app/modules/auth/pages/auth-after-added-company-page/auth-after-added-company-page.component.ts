/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: auth-after-added-company-page.component.ts
 * Last modified: 6/4/23, 1:57 PM
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

import { Component, OnDestroy, OnInit } from "@angular/core";

import { takeUntil } from "rxjs";

import { IAddCompanyResDto } from "../../../commons/models/company.model";
import { AbstractComponentReactiveProvider } from "../../../commons/utils/abstract-component-reactive-provider";

import { FileHelperService } from "../../../commons/services/file-helper/file-helper.service";
import { AddedCompanyCredentialsService } from "../../services/added-company-credentials/added-company-credentials.service";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Component({
    selector: "app-auth-after-added-company-page",
    templateUrl: "./auth-after-added-company-page.component.html",
})
export class AuthAfterAddedCompanyPageComponent extends AbstractComponentReactiveProvider implements OnInit, OnDestroy {

    companyAddedCred: IAddCompanyResDto | null = null;

    constructor(
        private _fileHelperService: FileHelperService,
        private _addedCompanyCredentialsService: AddedCompanyCredentialsService,
    ) {
        super();
    };

    ngOnInit(): void {
        this._addedCompanyCredentialsService.companyAddedCred$
            .pipe(takeUntil(this._unsubscribe))
            .subscribe(data => this.companyAddedCred = data);
    };

    ngOnDestroy(): void {
        this._addedCompanyCredentialsService.resetCredentials();
        this.subjectCleanup();
    };

    saveToFile(): void {
        if (!this.companyAddedCred) return;
        const { token, responseWords } = this.companyAddedCred;
        const formattedData = "Token:\n" + token + "\n\nResponse words:\n" + responseWords.join("\n");
        this._fileHelperService.saveTextToFile(formattedData, "secure-data.txt");
    };
}
