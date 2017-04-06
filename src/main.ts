import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';
import './asset/style.css';
import 'mydatepicker/bundles/mydatepicker.umd.js';
import 'mydaterangepicker/bundles/mydaterangepicker.umd.js';


import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

console.info('app.environment:', app.environment);
if (app.environment === 'production') {
  enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule);
