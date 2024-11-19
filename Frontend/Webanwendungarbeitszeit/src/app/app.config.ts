import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { MyRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(MyRoutes), provideClientHydration()]
};
