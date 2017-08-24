import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'delete-dialog',
    template: `
    <md-card style="
    padding-top: 0px;
"> <button (click)="dialogRef.close(false)" style="float:right;min-width:25px" md-button mdTooltip="close">
                      X
                    </button>
<md-card-title> <p>{{ title }}</p></md-card-title>
        <md-card-content>
        <p>{{ message }}</p><br>
        <button type="button" md-raised-button 
            (click)="dialogRef.close(true)" color="primary" mdTooltip="ok">OK</button>
        <button type="button" md-button 
            (click)="dialogRef.close(false)" color="primary" mdTooltip="cancel">Cancel</button>
 </md-card-content>
</md-card>
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


