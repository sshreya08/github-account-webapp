import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Repository } from '../interfaces/repo';
import { Apollo, gql } from 'apollo-angular';

const REPOSITORIES = gql`
  query GetRepository {
    repository(login: "geerlingguy") {
      users {
        login
        repos
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class GraphQLGithubService {
  constructor(private apollo: Apollo) {}

  //   configUrl = 'https://api.github.com';

  getRepos(user = 'geerlingguy') {
    return this.apollo.watchQuery<any>({
      query: REPOSITORIES,
      variables: {
        login: user,
      },
    }).valueChanges;
    // return this.http.get<Repository[]>(`${this.configUrl}/users/${user}/repos`);
  }
}
