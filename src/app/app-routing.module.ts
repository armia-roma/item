import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FollowerComponent } from './follower/follower.component';
import { GithubProfileComponent } from './github-profile/github-profile.component';
import { ItemDisplayComponent } from './item-display/item-display.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { ItemListComponent } from './item-list/item-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PostsComponent } from './posts/posts.component';
const routes: Routes = [
  { path: 'posts', component: PostsComponent },
  { path: 'follower', component: FollowerComponent },
  { path: 'follower/:id', component: GithubProfileComponent },
  {	path: 'create-item', component: ItemFormComponent},
  { path: 'item/:id', component: ItemDisplayComponent },
  { path: 'item/edit/:id', component: ItemFormComponent},
  { path: 'item', component: ItemListComponent},
  { path: '**', component: NotFoundComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
