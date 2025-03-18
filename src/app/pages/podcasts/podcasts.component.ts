import { Component } from '@angular/core';
import { PodcastsService } from '../../service/podcasts.service';
import { Podcast } from '../../data/podcast';
import { MatDialog } from '@angular/material/dialog';
import { AddPodcastDialogComponent } from '../../components/add-podcast-dialog/add-podcast-dialog.component';
import { EditPodcastDialogComponent } from '../../components/edit-podcast-dialog/edit-podcast-dialog.component';
import { DeletePodcastDialogComponent } from '../../components/delete-podcast-dialog/delete-podcast-dialog.component';

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
    const dialogRef = this.dialog.open(AddPodcastDialogComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.getPodcasts();
    });
  }

  openEditPodcastDialog(podcast: Podcast) {
    const dialogRef = this.dialog.open(EditPodcastDialogComponent, {
      data: podcast,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getPodcasts();
    });
  }

  openDeletePodcastDialog(podcast: Podcast) {
    const dialogRef = this.dialog.open(DeletePodcastDialogComponent, {
      data: podcast,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getPodcasts();
    });
  }
}
