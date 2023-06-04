import { Injectable, Inject } from '@angular/core';
import { BrickOption } from '../models/brick.model';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BrickOptionService {
  _baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  async get(brickTypeId: number): Promise<BrickOption> {
    const url = `${this._baseUrl}brickoption?brickTypeId=${brickTypeId}`;
    const brickOption$ = this.http.get<BrickOption>(url).pipe(map((response) => response));
    return await lastValueFrom(brickOption$);
  }
}
