import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs';

export interface LazySelectionDialogData {
  title: string;
  choices$: Observable<any[]>;
  toStringFunction?: (element: any) => string;
}

@Component({
  selector: 'app-lazy-selection-dialog',
  templateUrl: './lazy-selection-dialog.component.html',
  styleUrls: ['./lazy-selection-dialog.component.css']
})
export class LazySelectionDialogComponent {

  selected: any;

  constructor(
    private dialogRef: MatDialogRef<LazySelectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LazySelectionDialogData) {
  }

  toString(element: any): string {
    if (this.data.toStringFunction) {
      return this.data.toStringFunction(element);
    }

    return element.toString();
  }

  cancel() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.selected);
  }
}
