import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FollowerComponent } from './follower/follower.component';
import { GithubProfileComponent } from './github-profile/github-profile.component';
import { ItemCreateFormComponent } from './item-create-form/item-create-form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PostsComponent } from './posts/posts.component';
const routes: Routes = [
  { path: 'posts', component: PostsComponent },
  { path: 'follower', component: FollowerComponent },
  { path: 'follower/:id', component: GithubProfileComponent },
  {	path: 'create-item', component: ItemCreateFormComponent},
  { path: '**', component: NotFoundComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
