import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Artist } from '../../data/artist';
import {
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
  selector: 'app-edit-podcast-dialog',
  templateUrl: './edit-podcast-dialog.component.html',
  styleUrl: './edit-podcast-dialog.component.scss',
})
export class EditPodcastDialogComponent implements OnInit {
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
      artists: this.data.artists.map((artist) => artist.id), // IDs extrahieren
      topics: this.data.topics.map((topic) => topic.id), // IDs extrahieren
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
        description: this.podcastForm.value.description || '',
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
