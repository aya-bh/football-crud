import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { PlayerAddComponent } from './components/player-add/player-add.component';
import { PlayerEditComponent } from './components/player-edit/player-edit.component';
import { PlayerImportComponent } from './components/player-import/player-import.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'players', component: PlayerListComponent, canActivate: [authGuard] },
  { path: 'add', component: PlayerAddComponent, canActivate: [authGuard] },
  {
    path: 'edit/:id',
    component: PlayerEditComponent,
    canActivate: [authGuard],
  },
  {
    path: 'import',
    component: PlayerImportComponent,
    canActivate: [authGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
