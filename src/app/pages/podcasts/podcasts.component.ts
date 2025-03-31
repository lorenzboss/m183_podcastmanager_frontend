import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  DeleteDialogComponent,
  DeleteDialogData,
} from '../../components/delete-dialog/delete-dialog.component';
import { PodcastDialogComponent } from '../../components/podcast-dialog/podcast-dialog.component';
import { Podcast } from '../../data/podcast';
import { PodcastsService } from '../../service/podcasts.service';

@Component({
  selector: 'app-podcasts',
  templateUrl: './podcasts.component.html',
  styleUrl: './podcasts.component.scss',
})
export class PodcastsComponent {
  constructor(
    private podcastsService: PodcastsService,
    public dialog: MatDialog
  ) {
    this.getPodcasts();
  }
  podcasts: Podcast[] = [];
  displayedColumns: string[] = [
    'title',
    'description',
    'artists',
    'topics',
    'actions',
  ];

  public getPodcasts() {
    this.podcastsService.getPodcasts().subscribe((podcasts: Podcast[]) => {
      this.podcasts = podcasts;
    });
  }

  openAddPodcastDialog() {
    const dialogRef = this.dialog.open(PodcastDialogComponent, {
      data: null, // Pass null for add mode
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getPodcasts();
      }
    });
  }

  openEditPodcastDialog(podcast: Podcast) {
    const dialogRef = this.dialog.open(PodcastDialogComponent, {
      data: podcast, // Pass podcast object for edit mode
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getPodcasts();
      }
    });
  }

  openDeletePodcastDialog(podcast: Podcast) {
    const dialogData: DeleteDialogData<Podcast> = {
      item: podcast,
      itemType: 'Podcast',
      deleteFunction: (item: Podcast) =>
        this.podcastsService.deletePodcast(item),
    };

    const dialogRef = this.dialog.open(DeleteDialogComponent<Podcast>, {
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getPodcasts();
      }
    });
  }
}
