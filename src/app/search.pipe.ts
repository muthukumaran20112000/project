import { Pipe, PipeTransform } from '@angular/core';
import { Detail } from './detail';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(users: Detail[], searchWord:string): any {
    if(!searchWord)
    return users;
    let filter: Detail[]=[];
    for( let i=0; i< users.length; i++){
      if(users[i].username.startsWith(searchWord))
      {
        filter.push(users[i]);
      }
    }
    return filter;
  }

}
