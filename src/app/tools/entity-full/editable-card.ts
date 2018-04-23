import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UserService } from "app/main/user/user.service";
import { UserDataService } from "app/main/user/user-data.service";
import { EditService } from "app/tools/entity-full/edit.service";
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { AdaptiveService } from 'app/tools/adaptive.service';

export class EditableCard {
    public isEditVisible: boolean = false;
    public isEditMode: boolean = false;

    @Output() onSaved: EventEmitter<any>;
    @Output() onCanceled: EventEmitter<any>;
    public onEditModeEnabled: EventEmitter<any>;

    public isUsers: boolean = false;

    constructor() {
        this.onSaved = new EventEmitter();
        this.onCanceled = new EventEmitter();
        this.onEditModeEnabled = new EventEmitter();
    }
    
    public changeEditMode(choice: number) {
        if (choice > 0) {
            this.onEditModeEnabled.emit();
            this.isEditMode = true;
        }
        else this.isEditMode = false;
    }

    public changeEditVisible(choice: number) {
        if (!this.isUsers) return;

        if (choice > 0) this.isEditVisible = true;
        else this.isEditVisible = false;
    }

    public save() {
        this.isEditMode = false;
        this.onSaved.emit();
    }

    public cancel() {
        this.isEditMode = false;
        this.onCanceled.emit();
    }
}

export class EditableCardContainer {
    constructor(protected userService: UserService,
                protected userDataService: UserDataService) {

    }

    protected isUsers: boolean = false;
}