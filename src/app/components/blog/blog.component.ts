import {Component, OnInit} from '@angular/core';
import {PostsService} from '../../shared/services/posts.service';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({opacity: 0}),
            animate('.5s ease-out',
              style({opacity: 1}))
          ]
        ),
        transition(
          ':leave',
          [
            style({opacity: 1}),
            animate('.5s ease-in',
              style({opacity: 0}))
          ]
        )
      ]
    )
  ]
})
export class BlogComponent implements OnInit {
  posts: any;
  perPage: any;
  dropDownShow: boolean;
  allPosts: any;
  paginationArray: Array<any> = [];
  isLoading: boolean;

  constructor(private postService: PostsService) {
  }

  ngOnInit(): void {
    this.dropDownShow = false;
    this.perPage = 5;
    this.getPostsPerPage(this.perPage, 1);
  }

  getPostsPerPage(count: number, page?: number) {
    this.isLoading = true;
    this.perPage = count;
    let datas;
    if (page) {
      datas = `?number=${count}&page=${page}`;
    } else {
      datas = `?number=${count}`;
    }
    this.postService.getPosts(datas).subscribe(data => {
      this.formatPosts(data);
      this.isLoading = false;
    });
  }

  formatPosts(data) {
    this.posts = data.posts;
    this.posts.forEach(e => {
      e.tags = Object.keys(e.tags).map(key => {
        return e.tags[key];
      });
    });
    this.allPosts = data.found;
    this.pagination(this.allPosts, this.perPage);
  }

  pagination(all: number, perPage: number) {
    this.paginationArray.length = Math.ceil(all / perPage);
  }

  goToPage(e, page) {
    e.preventDefault();
    this.getPostsPerPage(this.perPage, page);
  }
}
