import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BOOKS } from '../data/book.data';
import { of, Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = 'http://59498bce6d49df0011102cfc.mockapi.io/books';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    // console.log('http', this.http);

    return this.http.get<Book[]>(this.baseUrl);
    // return of(BOOKS);
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.baseUrl, book);
  }
}
