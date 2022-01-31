import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private appConfig: any;

  constructor (private injector: Injector) { }

  loadAppConfig() {
      let http = this.injector.get(HttpClient);
      return http.get('assets/data.json')
      .toPromise()
      .then(data => {
          console.log(data);
          this.appConfig = data;
      })
  }

  get config() {
      return this.appConfig;
  }
}
