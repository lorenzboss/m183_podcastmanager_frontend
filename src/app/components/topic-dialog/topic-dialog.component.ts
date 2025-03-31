import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateTopic, Topic } from '../../data/topic';
import { TopicsService } from '../../service/topics.service';

@Component({
  selector: 'app-topic-dialog',
  templateUrl: './topic-dialog.component.html',
  styleUrl: './topic-dialog.component.scss',
})
export class TopicDialogComponent implements OnInit {
  topicForm = this.fb.group({
    description: ['', Validators.required],
  });

  isEditMode = false;
  submitButtonText = 'Add Topic';

  constructor(
    private fb: FormBuilder,
    private topicsService: TopicsService,
    private dialogRef: MatDialogRef<TopicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Topic | null
  ) {}

  ngOnInit() {
    if (this.data) {
      this.isEditMode = true;
      this.submitButtonText = 'Edit Topic';
      this.topicForm.patchValue({
        description: this.data.description,
      });
    }
  }

  onSubmit() {
    if (this.topicForm.valid && this.topicForm.value.description) {
      if (this.isEditMode && this.data) {
        const topic: Topic = {
          id: this.data.id,
          description: this.topicForm.value.description as string,
        };
        this.topicsService.updateTopic(topic).subscribe({
          next: () => {
            this.dialogRef.close(true);
          },
          error: (error) => {
            console.error(error);
          },
        });
      } else {
        const topic: CreateTopic = {
          description: this.topicForm.value.description as string,
        };
        this.topicsService.saveTopic(topic).subscribe({
          next: () => {
            this.dialogRef.close(true);
          },
          error: (error) => {
            console.error(error);
          },
        });
      }
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
