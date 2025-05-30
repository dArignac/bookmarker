import { Pipe, PipeTransform } from '@angular/core';
import { Profile } from './models/Profile';

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
