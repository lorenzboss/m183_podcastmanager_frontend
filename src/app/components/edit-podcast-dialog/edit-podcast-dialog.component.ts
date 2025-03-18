import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PodcastsService } from '../../service/podcasts.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Artist } from '../../data/artist';
import { ArtistsService } from '../../service/artists.service';
import { Topic } from '../../data/topic';
import { TopicsService } from '../../service/topics.service';
import {
  CreatePodcastArtist,
  CreatePodcastTopic,
  Podcast,
  UpdatePodcast,
} from '../../data/podcast';

@Component({
  selector: 'app-edit-podcast-dialog',
  templateUrl: './edit-podcast-dialog.component.html',
  styleUrl: './edit-podcast-dialog.component.scss',
})
export class EditPodcastDialogComponent implements OnInit {
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
    private dialogRef: MatDialogRef<EditPodcastDialogComponent>,
    private artistsService: ArtistsService,
    private topicsService: TopicsService,
    @Inject(MAT_DIALOG_DATA) public data: Podcast
  ) {
    this.getArtists();
    this.getTopics();
  }

  ngOnInit() {
    this.podcastForm.patchValue({
      title: this.data.title,
      description: this.data.description,
    });
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

      const podcast: UpdatePodcast = {
        id: this.data.id,
        title: this.podcastForm.value.title as string,
        description: this.podcastForm.value.description as string,
        artists: artists,
        topics: topics,
      };
      this.podcastsService.updatePodcast(podcast).subscribe({
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
