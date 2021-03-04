import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { NgxApiQuery } from './ngx-api-query';

export interface NgxApiResourceConfig {
  baseUrl: string;
  prefix?: string;
}

export const NGX_API_RESOURCE = new InjectionToken<NgxApiResourceConfig>('NgxApiResourceConfig');

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [NgxApiQuery]
})
export class NgxApiResourceModule {
  static forRoot(config: NgxApiResourceConfig): ModuleWithProviders<NgxApiResourceModule> {
    return {
      ngModule: NgxApiResourceModule,
      providers: [{ provide: NGX_API_RESOURCE, useValue: config }]
    };
  }
}
