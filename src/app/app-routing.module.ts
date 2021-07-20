import { HomePagePageModule } from './home-page/home-page.module';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePagePageModule)
  },
  {
    path: 'robot-board',
    loadChildren: () => import('./robot-board/robot-board.module').then( m => m.RobotBoardPageModule)
  },
  {
    path: 'command',
    loadChildren: () => import('./command/command.module').then( m => m.CommandPageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./messages/messages.module').then( m => m.MessagesPageModule)
  },
  {
    path: 'commands',
    loadChildren: () => import('./commands/commands.module').then( m => m.CommandsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
