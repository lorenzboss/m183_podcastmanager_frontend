import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TopicsService } from '../../service/topics.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateTopic } from '../../data/topic';

@Component({
  selector: 'app-add-topic-dialog',
  templateUrl: './add-topic-dialog.component.html',
  styleUrl: './add-topic-dialog.component.scss',
})
export class AddTopicDialogComponent {
  topicForm = this.fb.group({
    description: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private topicsService: TopicsService,
    private dialogRef: MatDialogRef<AddTopicDialogComponent>
  ) {}

  onSubmit() {
    if (this.topicForm.valid && this.topicForm.value.description) {
      const topic: CreateTopic = {
        description: this.topicForm.value.description as string,
      };
      this.topicsService.saveTopic(topic).subscribe({
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
