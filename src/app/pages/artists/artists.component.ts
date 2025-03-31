import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddArtistDialogComponent } from '../../components/add-artist-dialog/add-artist-dialog.component';
import {
  DeleteDialogComponent,
  DeleteDialogData,
} from '../../components/delete-dialog/delete-dialog.component';
import { EditArtistDialogComponent } from '../../components/edit-artist-dialog/edit-artist-dialog.component';
import { Artist } from '../../data/artist';
import { ArtistsService } from '../../service/artists.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.scss',
})
export class ArtistsComponent {
  constructor(
    private artistsService: ArtistsService,
    public dialog: MatDialog
  ) {
    this.getArtists();
  }
  artists: Artist[] = [];
  displayedColumns: string[] = ['firstname', 'lastname', 'actions'];

  public getArtists() {
    this.artistsService.getArtists().subscribe((artists: Artist[]) => {
      this.artists = artists;
    });
  }

  openAddArtistDialog() {
    const dialogRef = this.dialog.open(AddArtistDialogComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.getArtists();
    });
  }

  openEditArtistDialog(artist: Artist) {
    const dialogRef = this.dialog.open(EditArtistDialogComponent, {
      data: artist,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getArtists();
    });
  }

  openDeleteArtistDialog(artist: Artist) {
    const dialogData: DeleteDialogData<Artist> = {
      item: artist,
      itemType: 'Artist',
      deleteFunction: (item: Artist) => this.artistsService.deleteArtist(item),
    };

    const dialogRef = this.dialog.open(DeleteDialogComponent<Artist>, {
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getArtists();
      }
    });
  }
}
