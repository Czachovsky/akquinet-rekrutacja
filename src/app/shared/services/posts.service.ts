import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) {
  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return throwError(errMsg);
  }

  getPosts(data?: string): Observable<any> {
    return this.http
      .get(`https://public-api.wordpress.com/rest/v1/sites/en.blog.wordpress.com/posts/${data}`).pipe(
        catchError(this.handleError));
  }

  getSinglePost(postID): Observable<any> {
    return this.http
      .get(`https://public-api.wordpress.com/rest/v1/sites/en.blog.wordpress.com/posts/${postID}`).pipe(
        catchError(this.handleError));
  }

  getPostComments(postID): Observable<any> {
    return this.http
      .get(`https://public-api.wordpress.com/rest/v1/sites/en.blog.wordpress.com/posts/${postID}/replies/`).pipe(
        catchError(this.handleError));
  }

}
