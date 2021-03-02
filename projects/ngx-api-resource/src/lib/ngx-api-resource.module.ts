import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { NgxApiResourceComponent } from './ngx-api-resource.component';

export interface NgxApiResourceConfig {
  baseUrl: string;
  prefix?: string;
}

export const NGX_API_RESOURCE = new InjectionToken<NgxApiResourceConfig>('NgxApiResourceConfig');

@NgModule({
  declarations: [NgxApiResourceComponent],
  imports: [],
  exports: [NgxApiResourceComponent]
})
export class NgxApiResourceModule {
  static forRoot(config: NgxApiResourceConfig): ModuleWithProviders<NgxApiResourceModule> {
    return {
      ngModule: NgxApiResourceModule,
      providers: [{ provide: NGX_API_RESOURCE, useValue: config }]
    };
  }
}
