import { Component, Inject } from '@angular/core';
import { PodcastsService } from '../../service/podcasts.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Podcast } from '../../data/podcast';

@Component({
  selector: 'app-delete-podcast-dialog',
  templateUrl: './delete-podcast-dialog.component.html',
  styleUrl: './delete-podcast-dialog.component.scss',
})
export class DeletePodcastDialogComponent {
  constructor(
    private podcastsService: PodcastsService,
    private dialogRef: MatDialogRef<DeletePodcastDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Podcast
  ) {}

  deletePodcast() {
    this.podcastsService.deletePodcast(this.data).subscribe({
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
