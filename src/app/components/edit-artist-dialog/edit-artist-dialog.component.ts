import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ArtistsService } from '../../service/artists.service';
import { Artist } from '../../data/artist';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-artist-dialog',
  templateUrl: './edit-artist-dialog.component.html',
  styleUrl: './edit-artist-dialog.component.scss',
})
export class EditArtistDialogComponent implements OnInit {
  artistForm = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private artistsService: ArtistsService,
    private dialogRef: MatDialogRef<EditArtistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Artist
  ) {}

  ngOnInit() {
    this.artistForm.patchValue(this.data);
  }

  onSubmit() {
    if (
      this.artistForm.valid &&
      this.artistForm.value.firstname &&
      this.artistForm.value.lastname
    ) {
      const artist: Artist = {
        id: this.data.id,
        firstname: this.artistForm.value.firstname as string,
        lastname: this.artistForm.value.lastname as string,
      };
      this.artistsService.updateArtist(artist).subscribe({
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
