import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Artist } from '../../data/artist';
import {
  CreatePodcast,
  CreatePodcastArtist,
  CreatePodcastTopic,
} from '../../data/podcast';
import { Topic } from '../../data/topic';
import { ArtistsService } from '../../service/artists.service';
import { PodcastsService } from '../../service/podcasts.service';
import { TopicsService } from '../../service/topics.service';

@Component({
  selector: 'app-add-podcast-dialog',
  templateUrl: './add-podcast-dialog.component.html',
  styleUrl: './add-podcast-dialog.component.scss',
})
export class AddPodcastDialogComponent {
  podcastForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    artists: [<number[]>[], Validators.required],
    topics: [<number[]>[], Validators.required],
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
        description: this.podcastForm.value.description || '',
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
