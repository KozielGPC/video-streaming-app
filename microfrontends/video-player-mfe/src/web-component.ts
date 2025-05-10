import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { createCustomElement } from '@angular/elements';

platformBrowserDynamic([
  { provide: BrowserModule, useValue: BrowserModule },
])
  .bootstrapModule(AppComponent)
  .then(moduleRef => {
    const injector = moduleRef.injector;
    const el = createCustomElement(AppComponent, { injector });
    if (!customElements.get('video-player-mfe')) {
      customElements.define('video-player-mfe', el);
    }
  })
  .catch(err => console.error(err)); 