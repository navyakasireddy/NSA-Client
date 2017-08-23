import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'delete-dialog',
    template: `
        <p>{{ title }}</p>
        <p>{{ message }}</p>
        <button type="button" md-raised-button 
            (click)="dialogRef.close(true)">OK</button>
        <button type="button" md-button 
            (click)="dialogRef.close(false)">Cancel</button>
    `,

})
export class DeleteDialog {

    public title: string;
    public message: string;

    constructor(public dialogRef: MdDialogRef<DeleteDialog>) {
        this.title = "Delete";
        this.message = "Are you sure you want to delete?";
    }
}


