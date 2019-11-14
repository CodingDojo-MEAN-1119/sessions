import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BOOKS } from '../data/book.data';
import { of, Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  // private baseUrl = 'http://59498bce6d49df0011102cfc.mockapi.io/books';
  private baseUrl = '/books';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    // console.log('http', this.http);

    return this.http.get<Book[]>(this.baseUrl);
    // return of(BOOKS);
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.baseUrl, book);
  }

  getBook(bookId: string): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${bookId}`);
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}/${book._id}`, book);
  }

  removeBook(bookId: string): Observable<Book> {
    return this.http.delete<Book>(`${this.baseUrl}/${bookId}`);
  }
}
