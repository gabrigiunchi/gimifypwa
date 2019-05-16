import {Pipe, PipeTransform} from '@angular/core';
import {City} from '../model/entities/city';
import {TitleCasePipe} from '@angular/common';

@Pipe({
  name: 'cityName'
})
export class CityNamePipe implements PipeTransform {

  transform(city: City): string {
    return new TitleCasePipe().transform(city.name.replace('_', ' '));
  }

}
