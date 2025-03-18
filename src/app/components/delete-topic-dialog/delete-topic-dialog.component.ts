import { Component, Inject } from '@angular/core';
import { TopicsService } from '../../service/topics.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Topic } from '../../data/topic';

@Component({
  selector: 'app-delete-topic-dialog',
  templateUrl: './delete-topic-dialog.component.html',
  styleUrl: './delete-topic-dialog.component.scss',
})
export class DeleteTopicDialogComponent {
  constructor(
    private topicsService: TopicsService,
    private dialogRef: MatDialogRef<DeleteTopicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Topic
  ) {}

  deleteTopic() {
    this.topicsService.deleteTopic(this.data).subscribe({
      next: () => {
        this.dialogRef.close();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
