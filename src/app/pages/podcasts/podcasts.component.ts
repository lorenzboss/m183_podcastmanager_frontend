import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPodcastDialogComponent } from '../../components/add-podcast-dialog/add-podcast-dialog.component';
import {
  DeleteDialogComponent,
  DeleteDialogData,
} from '../../components/delete-dialog/delete-dialog.component';
import { EditPodcastDialogComponent } from '../../components/edit-podcast-dialog/edit-podcast-dialog.component';
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
