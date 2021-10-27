import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Repository } from '../interfaces/repo';
import { User } from '../interfaces/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class HttpGithubService {
  constructor(private http: HttpClient) {}

  configUrl = 'https://api.github.com';

  getRepos(user = 'geerlingguy'): Observable<Repository[]> {
    return this.http.get<Repository[]>(`${this.configUrl}/users/${user}/repos`);
  }

  getCollaborators(user = 'geerlingguy'): Observable<User[]> {
    // return this.http.get<Collaborator[]>(`${collaborators_url}`);
    return this.http.get<User[]>(`${this.configUrl}/users`);
  }
}
