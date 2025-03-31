import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Artist } from '../../data/artist';
import {
  CreatePodcast,
  CreatePodcastArtist,
  CreatePodcastTopic,
  Podcast,
  UpdatePodcast,
} from '../../data/podcast';
import { Topic } from '../../data/topic';
import { ArtistsService } from '../../service/artists.service';
import { PodcastsService } from '../../service/podcasts.service';
import { TopicsService } from '../../service/topics.service';

@Component({
  selector: 'app-podcast-dialog',
  templateUrl: './podcast-dialog.component.html',
  styleUrl: './podcast-dialog.component.scss',
})
export class PodcastDialogComponent implements OnInit {
  podcastForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    artists: [<number[]>[], Validators.required],
    topics: [<number[]>[], Validators.required],
  });

  artists: Artist[] = [];
  topics: Topic[] = [];
  isEditMode = false;
  submitButtonText = 'Add Podcast';

  constructor(
    private fb: FormBuilder,
    private podcastsService: PodcastsService,
    private dialogRef: MatDialogRef<PodcastDialogComponent>,
    private artistsService: ArtistsService,
    private topicsService: TopicsService,
    @Inject(MAT_DIALOG_DATA) public data: Podcast | null
  ) {
    this.getArtists();
    this.getTopics();
  }

  ngOnInit() {
    if (this.data) {
      this.isEditMode = true;
      this.submitButtonText = 'Edit Podcast';
      this.podcastForm.patchValue({
        title: this.data.title,
        description: this.data.description,
        artists: this.data.artists.map((artist) => artist.id),
        topics: this.data.topics.map((topic) => topic.id),
      });
    }
  }

  getArtists() {
    this.artistsService.getArtists().subscribe((artists: Artist[]) => {
      this.artists = artists;
    });
  }

  getTopics() {
    this.topicsService.getTopics().subscribe((topics: Topic[]) => {
      this.topics = topics;
    });
  }

  onSubmit() {
    if (
      this.podcastForm.valid &&
      this.podcastForm.value.title &&
      this.podcastForm.value.artists &&
      this.podcastForm.value.topics
    ) {
      const artists: CreatePodcastArtist[] = (
        this.podcastForm.value.artists as unknown as number[]
      ).map((id: number) => {
        return { id: id };
      });
      const topics: CreatePodcastTopic[] = (
        this.podcastForm.value.topics as unknown as number[]
      ).map((id: number) => {
        return { id: id };
      });

      if (this.isEditMode && this.data) {
        const podcast: UpdatePodcast = {
          id: this.data.id,
          title: this.podcastForm.value.title as string,
          description: this.podcastForm.value.description || '',
          artists: artists,
          topics: topics,
        };
        this.podcastsService.updatePodcast(podcast).subscribe({
          next: () => {
            this.dialogRef.close(true);
          },
          error: (error) => {
            console.error(error);
          },
        });
      } else {
        const podcast: CreatePodcast = {
          title: this.podcastForm.value.title as string,
          description: this.podcastForm.value.description || '',
          artists: artists,
          topics: topics,
        };
        this.podcastsService.savePodcast(podcast).subscribe({
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
