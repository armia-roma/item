import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { LikeComponent } from './like/like.component';
import { ZippyComponent } from './zippy/zippy.component';
import { InputFormatDirectiveDirective } from './input-format-directive.directive';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { TopicFormComponent } from './topic-form/topic-form.component';
import { PostsComponent } from './posts/posts.component';
import { AppErrorHandler } from './common/app-handler-error';
import { FollowerComponent } from './follower/follower.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GithubProfileComponent } from './github-profile/github-profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { RouterModule } from '@angular/router';
import { NgxTranslateModule } from './translate/translate.module';
// import { TranslateModule } from '@ngx-translate/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastComponent } from './toast/toast.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyPipe } from '@angular/common';
import { ItemDisplayComponent } from './item-display/item-display.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemFormComponent } from './item-form/item-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    FavoriteComponent,
    LikeComponent,
    ZippyComponent,
    InputFormatDirectiveDirective,
    ContactFormComponent,
    CourseFormComponent,
    LoginFormComponent,
    TopicFormComponent,
    PostsComponent,
    FollowerComponent,
    NavbarComponent,
    GithubProfileComponent,
    NotFoundComponent,
    ToastComponent,
    ItemDisplayComponent,
    ItemListComponent,
    ItemFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // RouterModule,
    NgxTranslateModule,
    BsDropdownModule.forRoot(),
    NgbModule,
    // TranslateModule.forRoot()
    
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler},
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
