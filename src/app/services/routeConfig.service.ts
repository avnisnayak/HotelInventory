import { InjectionToken } from '@angular/core';
import { RouteConfig } from './routeConfig';

export const ROUTE_SERVICE_CONFIG = new InjectionToken<RouteConfig>(
  'routeConfig'
);

export const ROUTE_HOME_CONFIG: RouteConfig = { title: 'Home' };
export const ROUTE_ROOM_CONFIG: RouteConfig = { title: 'Room' };
