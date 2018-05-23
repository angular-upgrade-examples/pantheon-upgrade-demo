import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TextUtilsService {
  toLowerCase(input: string): string {
    return input.toLowerCase();
  }

  toUpperCase(input: string): string {
    return input.toUpperCase();
  }
}
