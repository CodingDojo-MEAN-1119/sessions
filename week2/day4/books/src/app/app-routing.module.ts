import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import * as fromBooks from './books';

import { environment } from '../environments/environment';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';

const enableTracing = false && !environment.production;

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'books',
    // /books/books
    children: [
      {
        path: '',
        component: fromBooks.BookListComponent,
      },
      {
        path: 'new',
        component: fromBooks.BookNewComponent,
      },
      {
        path: ':id',
        component: fromBooks.BookDetailComponent,
      },
      {
        path: ':id/edit',
        component: fromBooks.BookEditComponent,
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
