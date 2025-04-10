import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/models/player';
import { PlayersService } from 'src/app/service/players.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { PlayerAddComponent } from '../player-add/player-add.component';
import { PlayerEditComponent } from '../player-edit/player-edit.component';
import { PlayerImportComponent } from '../player-import/player-import.component';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css'],
})
export class PlayerListComponent implements OnInit {
  players: Player[] = [];
  displayedPlayers: Player[] = [];
  totalPlayers: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'position',
    'team',
    'actions',
  ];

  constructor(
    private playerService: PlayersService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadPlayers();
  }

  loadPlayers(): void {
    this.playerService.getPlayers().subscribe((players) => {
      this.players = players;
      this.totalPlayers = players.length;
      this.updateDisplayedPlayers();
    });
  }

  updateDisplayedPlayers(): void {
    const startIndex = this.pageIndex * this.pageSize;
    this.displayedPlayers = this.players.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateDisplayedPlayers();
  }

  deletePlayer(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce joueur ?')) {
      this.playerService.deletePlayer(id).subscribe(() => {
        this.loadPlayers();
      });
    }
  }

  openAddPlayerDialog(): void {
    const dialogRef = this.dialog.open(PlayerAddComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.loadPlayers();
    });
  }

  openEditPlayerDialog(id: number): void {
    const dialogRef = this.dialog.open(PlayerEditComponent, {
      data: { id },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadPlayers();
    });
  }

  openImportDialog(): void {
    const dialogRef = this.dialog.open(PlayerImportComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadPlayers();
    });
  }
}
