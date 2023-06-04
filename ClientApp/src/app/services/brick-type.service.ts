import { Injectable, Inject } from '@angular/core';
import { BrickType } from '../models/brick.model';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BrickTypeService {
  _baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  async get(): Promise<BrickType[]> {
    const url = `${this._baseUrl}bricktype`;
    const brickTypes$ = this.http.get<BrickType[]>(url).pipe(map((response) => response));
    return await lastValueFrom(brickTypes$);
  }
}
