import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from 'src/app/models/player';
import { PlayersService } from 'src/app/service/players.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.css'],
})
export class PlayerEditComponent implements OnInit {
  player: Player = {
    firstName: '',
    lastName: '',
    position: '',
    team: '',
    age: 0,
  };
  playerId!: number;

  constructor(
    private playerService: PlayersService,
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<PlayerEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

  ngOnInit(): void {
    this.playerId = this.data.id;
    this.playerService.getPlayer(this.playerId).subscribe((player) => {
      this.player = player;
    });
  }

  updatePlayer(playerForm: NgForm): void {
    if (playerForm.invalid) {
      return;
    }

    this.playerService
      .updatePlayer(this.playerId, this.player)
      .subscribe(() => {
        alert('joueur mis à jour avec succès !');
        this.dialogRef.close();
      });
  }
}
