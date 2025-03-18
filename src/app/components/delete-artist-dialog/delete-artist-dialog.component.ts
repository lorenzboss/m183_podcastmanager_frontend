import { Component, Inject } from '@angular/core';
import { ArtistsService } from '../../service/artists.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Artist } from '../../data/artist';

@Component({
  selector: 'app-delete-artist-dialog',
  templateUrl: './delete-artist-dialog.component.html',
  styleUrl: './delete-artist-dialog.component.scss',
})
export class DeleteArtistDialogComponent {
  constructor(
    private artistsService: ArtistsService,
    private dialogRef: MatDialogRef<DeleteArtistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Artist
  ) {}

  deleteArtist() {
    this.artistsService.deleteArtist(this.data).subscribe({
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
