import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PlayersService } from 'src/app/service/players.service';

@Component({
  selector: 'app-player-import',
  templateUrl: './player-import.component.html',
  styleUrls: ['./player-import.component.css'],
})
export class PlayerImportComponent {
  file: File | null = null;

  constructor(
    private playerService: PlayersService,
    public dialogRef: MatDialogRef<PlayerImportComponent>
  ) {}

  handleFileInput(event: any): void {
    this.file = event.target.files[0];
  }

  upload(): void {
    if (this.file) {
      this.playerService.importPlayers(this.file).subscribe(() => {
        alert('Les joueurs sont importés avec succée');
        this.dialogRef.close();
      });
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
