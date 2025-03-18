import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TopicsService } from '../../service/topics.service';
import { Topic } from '../../data/topic';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-topic-dialog',
  templateUrl: './edit-topic-dialog.component.html',
  styleUrl: './edit-topic-dialog.component.scss',
})
export class EditTopicDialogComponent implements OnInit {
  topicForm = this.fb.group({
    description: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private topicsService: TopicsService,
    private dialogRef: MatDialogRef<EditTopicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Topic
  ) {}

  ngOnInit() {
    this.topicForm.patchValue(this.data);
  }

  onSubmit() {
    if (this.topicForm.valid && this.topicForm.value.description) {
      const topic: Topic = {
        id: this.data.id,
        description: this.topicForm.value.description as string,
      };
      this.topicsService.updateTopic(topic).subscribe({
        next: () => {
          this.dialogRef.close();
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
