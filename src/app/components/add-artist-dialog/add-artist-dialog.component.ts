import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ArtistsService } from '../../service/artists.service';
import { CreateArtist } from '../../data/artist';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-artist-dialog',
  templateUrl: './add-artist-dialog.component.html',
  styleUrl: './add-artist-dialog.component.scss',
})
export class AddArtistDialogComponent {
  artistForm = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private artistsService: ArtistsService,
    private dialogRef: MatDialogRef<AddArtistDialogComponent>
  ) {}

  onSubmit() {
    if (
      this.artistForm.valid &&
      this.artistForm.value.firstname &&
      this.artistForm.value.lastname
    ) {
      const artist: CreateArtist = {
        firstname: this.artistForm.value.firstname as string,
        lastname: this.artistForm.value.lastname as string,
      };
      this.artistsService.saveArtist(artist).subscribe({
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
