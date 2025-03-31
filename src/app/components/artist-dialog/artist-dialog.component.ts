import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Artist, CreateArtist } from '../../data/artist';
import { ArtistsService } from '../../service/artists.service';

@Component({
  selector: 'app-artist-dialog',
  templateUrl: './artist-dialog.component.html',
  styleUrl: './artist-dialog.component.scss',
})
export class ArtistDialogComponent implements OnInit {
  artistForm = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
  });

  isEditMode = false;
  submitButtonText = 'Add Artist';

  constructor(
    private fb: FormBuilder,
    private artistsService: ArtistsService,
    private dialogRef: MatDialogRef<ArtistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Artist | null
  ) {}

  ngOnInit() {
    if (this.data) {
      this.isEditMode = true;
      this.submitButtonText = 'Edit Artist';
      this.artistForm.patchValue({
        firstname: this.data.firstname,
        lastname: this.data.lastname,
      });
    }
  }

  onSubmit() {
    if (
      this.artistForm.valid &&
      this.artistForm.value.firstname &&
      this.artistForm.value.lastname
    ) {
      if (this.isEditMode && this.data) {
        const artist: Artist = {
          id: this.data.id,
          firstname: this.artistForm.value.firstname as string,
          lastname: this.artistForm.value.lastname as string,
        };
        this.artistsService.updateArtist(artist).subscribe({
          next: () => {
            this.dialogRef.close(true);
          },
          error: (error) => {
            console.error(error);
          },
        });
      } else {
        const artist: CreateArtist = {
          firstname: this.artistForm.value.firstname as string,
          lastname: this.artistForm.value.lastname as string,
        };
        this.artistsService.saveArtist(artist).subscribe({
          next: () => {
            this.dialogRef.close(true);
          },
          error: (error) => {
            console.error(error);
          },
        });
      }
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
