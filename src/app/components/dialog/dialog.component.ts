import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  description: string;
  enableCancel: boolean;
  type: string;
}

@Component({
  selector: 'medlog-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      
    }

  onNoClick(): void {
    
    this.dialogRef.close("0");
   
  }

  onCancelClick(): void {
    this.dialogRef.close("1");
  }

}
