import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UserService } from "app/main/user/user.service";
import { UserDataService } from "app/main/user/user-data.service";
import { EditService } from "app/tools/entity-full/edit.service";
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export class EditableCard {
    protected isEditVisible: boolean = false;
    protected isEditMode: boolean = false;

    @Output() onSaved: EventEmitter<any>;
    @Output() onCanceled: EventEmitter<any>;
    protected onEditModeEnabled: EventEmitter<any>;

    protected isUsers: boolean = false;

    constructor() {
        this.onSaved = new EventEmitter();
        this.onCanceled = new EventEmitter();
        this.onEditModeEnabled = new EventEmitter();
    }
    
    protected changeEditMode(choice: number) {
        if (choice > 0) {
            this.onEditModeEnabled.emit();
            this.isEditMode = true;
        }
        else this.isEditMode = false;
    }

    protected changeEditVisible(choice: number) {
        if (!this.isUsers) return;
        if (choice > 0) this.isEditVisible = true;
        else this.isEditVisible = false;
    }

    protected save() {
        this.isEditMode = false;
        this.onSaved.emit();
    }

    protected cancel() {
        this.isEditMode = false;
        this.onCanceled.emit();
    }
}

export class EditableCardContainer {
    constructor(protected userService: UserService,
                protected userDataService: UserDataService) {

    }

    protected isUsers: boolean = false;

    protected checkIsUserEntity(login: string) : Observable<boolean> {
        if (!this.userService.user) return;
        return Observable.create((observer: Observer<boolean>)=> this.userDataService.getUserEntitiesLogins().subscribe(logins => {
            this.isUsers = logins.find(x => x == login) ? true : false;
            observer.next(this.isUsers);
        }));
    }
}