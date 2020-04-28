import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BlogComponent} from '../../components/blog/blog.component';
import {MainPageComponent} from '../../components/main-page/main-page.component';
import {PostComponent} from '../../components/post/post.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {path: '', component: MainPageComponent, pathMatch: 'full'},
  {path: 'blog', component: BlogComponent},
  {path: 'post/:id', component: PostComponent}
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
