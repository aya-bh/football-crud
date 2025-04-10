import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Player } from 'src/app/models/player';
import { PlayersService } from 'src/app/service/players.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-player-add',
  templateUrl: './player-add.component.html',
  styleUrls: ['./player-add.component.css'],
})
export class PlayerAddComponent {
  player: Player = {
    firstName: '',
    lastName: '',
    position: '',
    team: '',
    age: 0,
  };

  constructor(
    private playerService: PlayersService,
    public dialogRef: MatDialogRef<PlayerAddComponent>
  ) {}

  addPlayer(playerForm: NgForm): void {
    if (playerForm.invalid) {
      return;
    }

    this.playerService.addPlayer(this.player).subscribe(() => {
      alert('Joueur ajouté avec succès !');
      this.dialogRef.close();
    });
  }
}
