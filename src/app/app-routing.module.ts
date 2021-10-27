import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepositoriesComponent } from './components/repositories/repositories.component';
import { RepositoryDetailComponent } from './components/repositories/repository-detail/repository-detail.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/repositories', pathMatch: 'full' },
  {
    path: 'repositories',
    component: RepositoriesComponent,
  },
  { path: 'repositories/:repositoryId', component: RepositoryDetailComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
