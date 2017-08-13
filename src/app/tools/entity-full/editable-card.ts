import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

export class EditableCard {
    protected isEditVisible: boolean = false;
    protected isEditMode: boolean = false;

    @Output() onSaved: EventEmitter<any>;
    @Output() onCanceled: EventEmitter<any>;

    protected isUsers: boolean = false;

    constructor() {
        this.onSaved = new EventEmitter();
        this.onCanceled = new EventEmitter();
    }

    protected changeEditMode(choice: number) {
        if (choice > 0) this.isEditMode = true;
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