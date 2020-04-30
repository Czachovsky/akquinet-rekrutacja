import {Component, OnInit} from '@angular/core';
import {PostsService} from '../../shared/services/posts.service';
import {ActivatedRoute} from '@angular/router';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
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
export class PostComponent implements OnInit {
  postData: any;
  isReady: boolean;
  comments: any;
  isLoading: boolean;

  constructor(private postService: PostsService, public activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    const postId = this.activatedRoute.snapshot.paramMap.get('id');

    this.postService.getSinglePost(postId).subscribe(data => {
      this.postData = data;
      this.postData.tags = Object.keys(this.postData.tags).map(key => {
        return this.postData.tags[key];
      });
      this.postData.categories = Object.keys(this.postData.categories).map(key => {
        return this.postData.categories[key];
      });
      this.isReady = true;
      this.isLoading = false;
    });
    this.postService.getPostComments(postId).subscribe(data => {
      this.comments = data.comments.reverse();
      const tempArr = this.comments.filter(e => e.parent);
      tempArr.forEach(e => this.comments.map(f => {
        if (f.ID === e.parent.ID) {
          f.children = e;
        }
      }));
      this.comments = this.comments.filter(e => !e.parent);
    });
  }

}
