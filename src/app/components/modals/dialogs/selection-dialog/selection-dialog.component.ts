import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface SelectionDialogData {
  title: string;
  choices: any[];
  toStringFunction?: (element) => string;
}

@Component({
  selector: 'app-selection-dialog',
  templateUrl: './selection-dialog.component.html',
  styleUrls: ['./selection-dialog.component.css']
})
export class SelectionDialogComponent {

  selected: any;

  constructor(
    private dialogRef: MatDialogRef<SelectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectionDialogData) {
  }

  toString(element: any): string {
    if (this.data.toStringFunction) {
      return this.data.toStringFunction(element);
    }

    return element.toString();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close(this.selected);
  }
}
