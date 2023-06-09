/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: auth.service.ts
 * Last modified: 24/05/2023, 00:39
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

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { catchError, Observable, tap, throwError } from "rxjs";

import { Utils } from "../../../commons/utils/utils";
import { AlertType } from "../../../commons/utils/alert.type";
import { ILoginFormModel } from "../../../commons/models/login.model";
import { AccountRole } from "../../../commons/types/account-role.type";
import { StorageKeyType } from "../../../commons/types/storage-key.type";
import { IRegisterFormModel, IRegisterReqDto } from "../../../commons/models/register.model";

import { AuthHttpService } from "../../../commons/http-services/auth-http/auth-http.service";
import { LazyCommonsService } from "../../../commons/services/lazy-commons/lazy-commons.service";
import { LocalStorageService } from "../../../commons/services/local-storage/local-storage.service";
import { LoggedStatusService } from "../../../commons/services/logged-status/logged-status.service";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Injectable()
export class AuthService {

    constructor(
        private _router: Router,
        private _authHttpService: AuthHttpService,
        private _authCommonsService: LazyCommonsService,
        private _loggedStatusService: LoggedStatusService,
        private _localStorageService: LocalStorageService,
    ) {
    };

    login$(formReq: ILoginFormModel): Observable<any> {
        this._authCommonsService.setLazyLoader(true);
        return this._authHttpService.login$(formReq).pipe(
            tap(({ id, username, name, access, refresh }) => {
                this._localStorageService.save(StorageKeyType.USER_TOKEN, { access, refresh });
                this._loggedStatusService.setLoggedUserData(true, AccountRole.USER, { id, name, username });
                this._authCommonsService.setLazyLoader(false);
            }),
            catchError(err => this.onCatchError$(err)),
        );
    };

    register$(formReq: IRegisterFormModel): Observable<any> {
        this._authCommonsService.setLazyLoader(true);
        const reqData: IRegisterReqDto = Utils.convertCamelToSnake(formReq);
        return this._authHttpService.register$(reqData).pipe(
            tap(() => {
                this._authCommonsService.setResponseAlert({
                    type: AlertType.INFO,
                    content: `Your account was successfully created. Go to <strong>login page</strong> to
                        login on your account.`,
                });
                this._authCommonsService.setLazyLoader(false);
            }),
            catchError(err => this.onCatchError$(err)),
        );
    };

    private onCatchError$(err: any): Observable<any> {
        this._authCommonsService.setLazyLoader(false);
        const resMessage = Utils.getFirstObjectErrorValue(err.error);
        this._authCommonsService.setResponseAlert({
            type: AlertType.ERROR, content: `${resMessage || "Unknow server error"}.`
        });
        return throwError(err);
    };
}
