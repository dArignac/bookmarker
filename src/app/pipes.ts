import { Pipe, PipeTransform } from '@angular/core';
import { Profile } from './types';

@Pipe({
  name: 'profileId',
})
export class ProfileIdPipe implements PipeTransform {
  transform(value: Profile | null): string {
    if (value) {
      return value.id || '';
    }
    return '';
  }
}
