import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DeleteDialogData<T> {
  item: T;
  itemType: string;
  deleteFunction: (item: T) => any;
}

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss',
})
export class DeleteDialogComponent<T> {
  constructor(
    private dialogRef: MatDialogRef<DeleteDialogComponent<T>>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteDialogData<T>
  ) {}

  deleteItem() {
    this.data.deleteFunction(this.data.item).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (error: any) => {
        console.error(error);
        this.dialogRef.close(false);
      },
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
