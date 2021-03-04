import { NgxApiQuery } from 'ngx-api-resource';

export class SimpleQuery extends NgxApiQuery {

  apply(): { [p: string]: any } {
    console.log('123');
    return this.filters;
  }
}
