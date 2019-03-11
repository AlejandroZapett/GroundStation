import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

//Ng bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { GsPresentationComponentComponent } from './components/gs-presentation-component/gs-presentation-component.component';
import { GsMainWrapperComponentComponent } from './components/gs-main-wrapper-component/gs-main-wrapper-component.component';
import { GsConnectionServiceComponent } from './services/gs-connection-service/gs-connection-service.component';
import { GsComputingDataServiceComponent } from './services/gs-computing-data-service/gs-computing-data-service.component';
import { GsGeneralMenuComponentComponent } from './components/menu-options/gs-general-menu-component/gs-general-menu-component.component';
import { GsTestsComponentComponent } from './components/menu-options/gs-tests-component/gs-tests-component.component';
import { GsSaveDataComponentComponent } from './components/menu-options/gs-save-data-component/gs-save-data-component.component';
import { GsGraphDataComponentComponent } from './components/menu-options//gs-graph-data-component/gs-graph-data-component.component';
import { GsFlightMonitorComponentComponent } from './components/menu-options//gs-flight-monitor-component/gs-flight-monitor-component.component';
import { GsPadComponentComponent } from './components/menu-options/monitor-options/gs-pad-component/gs-pad-component.component';
import { GsStorageDataService } from './services/gs-storage-data-service/gs-storage-data-service.component';
import { GsConnectionSerialService } from './services/gs-connection-service/gs-connection-serial-service';
import { GsFileSystemService } from './services/gs-file-system-service/gs-file-system-service';
import { GsParseService } from './services/gs-parse-service/gs-parse-service';
import { ChartsModule } from 'ng2-charts';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    WebviewDirective,
    GsPresentationComponentComponent,
    GsMainWrapperComponentComponent,
    GsGeneralMenuComponentComponent,
    GsTestsComponentComponent,
    GsSaveDataComponentComponent,
    GsGraphDataComponentComponent,
    GsFlightMonitorComponentComponent,
    GsPadComponentComponent
  ],
  imports: [
    ChartsModule,
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    ElectronService,
    GsConnectionServiceComponent,
    GsComputingDataServiceComponent,
    GsStorageDataService,
    GsConnectionSerialService,
    GsFileSystemService,
    GsParseService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
