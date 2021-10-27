import { Component, OnInit } from '@angular/core';

import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HttpGithubService } from './../../../services/http-github.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-repository-detail',
  templateUrl: './repository-detail.component.html',
  styleUrls: ['./repository-detail.component.scss'],
})
export class RepositoryDetailComponent implements OnInit {
  users: User[] = [];
  isLoading = of(false);

  //dependency injection
  constructor(
    private httpGithubService: HttpGithubService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getRepositories();
  }

  getRepositories() {
    this.isLoading = of(true);
    this.httpGithubService.getCollaborators().subscribe(
      (res: User[]) => {
        console.log(res);
        this.isLoading = of(false);
        if (res.length) {
          res.forEach((user) => {
            let oneUser: any = {};
            oneUser['id'] = user.id;
            oneUser['login'] = user.login;
            oneUser['avatar_url'] = user.avatar_url;
            this.users.push(oneUser);
          });
        }
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

  showNotification(message: string) {
    this._snackBar.open(message, 'Ok', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      // panelClass: ['class-name'],  UX required     # DO NOT REMOVE
    });
  }
}
