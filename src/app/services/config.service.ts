import { Inject, Injectable } from '@angular/core';
import { ROUTE_SERVICE_CONFIG } from './routeConfig.service';
import { RouteConfig } from './routeConfig';

@Injectable({
  providedIn: 'any',
})
export class ConfigService {
  constructor(@Inject(ROUTE_SERVICE_CONFIG) private configToken: RouteConfig) {
    console.log('ConfigService');
    console.log(this.configToken);
  }
}
