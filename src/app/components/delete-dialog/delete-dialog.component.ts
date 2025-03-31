import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    @Inject(MAT_DIALOG_DATA) public data: DeleteDialogData<T>,
    private snackBar: MatSnackBar
  ) {}

  deleteItem() {
    this.data.deleteFunction(this.data.item).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (error: any) => {
        this.snackBar.open(
          'Deletion failed. Please check if there are any references in podcasts!',
          'OK',
          {
            duration: 5000,
          }
        );
        this.dialogRef.close(false);
      },
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
