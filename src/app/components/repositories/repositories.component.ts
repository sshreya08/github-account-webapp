import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { of } from 'rxjs';
import * as moment from 'moment';

import { HttpGithubService } from './../../services/http-github.service';
import { GraphQLGithubService } from './../../services/graphQL-github-service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Repo, Repository } from '../../interfaces/repo';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss'],
})
export class RepositoriesComponent implements OnInit {
  repositories: Repo[] = [];
  isLoading = of(false);

  constructor(
    private router: Router,
    private httpGithubService: HttpGithubService,
    private graphQLGithubService: GraphQLGithubService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getRepositories();
    // this.graphQLGithubService.getRepos().subscribe((data) => {
    //   console.log('========', data);
    // });
  }

  getRepositories() {
    this.isLoading = of(true);
    this.httpGithubService.getRepos().subscribe(
      (res: Repository[]) => {
        this.isLoading = of(false);
        if (!res.length) {
          return;
        }
        res.forEach((repo: Repository) => {
          let oneRepo: Repo | any = {};
          oneRepo.name = repo.name;
          oneRepo.id = repo.id;
          oneRepo.watchers = repo.watchers;
          oneRepo.language = repo.language || 'Mixed';
          oneRepo.forks = repo.forks;
          oneRepo.description = repo.description;
          oneRepo.stars = repo.stargazers_count;
          oneRepo.openIssues = repo.open_issues_count;
          oneRepo.lastUpdated = this.convertDateToNow(repo.updated_at);
          this.repositories.push(oneRepo);
        });
      },
      (error: HttpErrorResponse) => {
        this.isLoading = of(false);
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        this.showNotification(errorMessage);
      }
    );
  }

  //get date in comparision to current time
  convertDateToNow(date: string): string {
    return moment(date).fromNow();
  }

  showNotification(message: string) {
    this._snackBar.open(message, 'Ok', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }

  onSelect(repository: any): void {
    const { id } = repository;
    this.router.navigateByUrl(`/repositories/${id}`);
  }
}
