import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  private apiUrl = 'http://localhost:8000/api/players';

  constructor(private http: HttpClient) {}

  getPlayers(): Observable<Player[]> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Player[]>(this.apiUrl, { headers });
  }

  getPlayer(id: number): Observable<Player> {
    const token = localStorage.getItem('auth_token'); // Retrieve token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Player>(`${this.apiUrl}/${id}`, { headers });
  }

  addPlayer(player: Player): Observable<Player> {
    const token = localStorage.getItem('auth_token'); // Retrieve token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<Player>(this.apiUrl, player, { headers });
  }

  updatePlayer(id: number, player: Player): Observable<Player> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<Player>(`${this.apiUrl}/${id}`, player, { headers });
  }

  deletePlayer(id: number): Observable<void> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  importPlayers(file: File): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/import`, formData, { headers });
  }
}
