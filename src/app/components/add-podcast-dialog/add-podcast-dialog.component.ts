import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PodcastsService } from '../../service/podcasts.service';
import { MatDialogRef } from '@angular/material/dialog';
import {
  CreatePodcast,
  CreatePodcastArtist,
  CreatePodcastTopic,
} from '../../data/podcast';
import { Artist } from '../../data/artist';
import { ArtistsService } from '../../service/artists.service';
import { Topic } from '../../data/topic';
import { TopicsService } from '../../service/topics.service';

@Component({
  selector: 'app-add-podcast-dialog',
  templateUrl: './add-podcast-dialog.component.html',
  styleUrl: './add-podcast-dialog.component.scss',
})
export class AddPodcastDialogComponent {
  podcastForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    artists: ['', Validators.required],
    topics: ['', Validators.required],
  });

  artists: Artist[] = [];
  topics: Topic[] = [];

  constructor(
    private fb: FormBuilder,
    private podcastsService: PodcastsService,
    private dialogRef: MatDialogRef<AddPodcastDialogComponent>,
    private artistsService: ArtistsService,
    private topicsService: TopicsService
  ) {
    this.getArtists();
    this.getTopics();
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
      this.podcastForm.value.description &&
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

      const podcast: CreatePodcast = {
        title: this.podcastForm.value.title as string,
        description: this.podcastForm.value.description as string,
        artists: artists,
        topics: topics,
      };
      this.podcastsService.savePodcast(podcast).subscribe({
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
