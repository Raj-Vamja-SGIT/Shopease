<<<<<<< HEAD
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

=======
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
>>>>>>> ce0eaddeb013ee01f022291ea15c0f805bc7b1f5

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
