import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ColumnMenuService, ContextMenuService, ExcelExportService, FreezeService, PdfExportService, ReorderService, ResizeService, RowDDService, TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { SortService, FilterService, EditService, ToolbarService } from '@syncfusion/ej2-angular-treegrid';
import { AppComponent } from './app.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { AppConfigService } from 'src/services/app-config.service';
import { HttpClientModule } from '@angular/common/http';
import { ContextMenuModule } from '@syncfusion/ej2-angular-navigations';
import { HomeComponent } from './home/home.component';
import { enableRipple } from '@syncfusion/ej2-base';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ColumnChooserService} from '@syncfusion/ej2-angular-treegrid';
import { ColumnformComponent } from './columnform/columnform.component';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { TestComponent } from './test/test.component';
import { OneComponent } from './one/one.component';
import { TwoComponent } from './two/two.component';

enableRipple(true);
const appInitializerFn = (appConfig: AppConfigService) => {
  return () => {
    return appConfig.loadAppConfig();
  }
};
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ColumnformComponent,
    TestComponent,
    OneComponent,
    TwoComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    BrowserModule,
    TreeGridModule,
    ButtonModule,
    DropDownListAllModule,
    ReactiveFormsModule,
    FormsModule,
    NumericTextBoxAllModule,
    DatePickerAllModule,
    ContextMenuModule,
    DialogModule
  ],
  providers: [

    EditService,
    SortService,
    FilterService,
    EditService,
    ResizeService,
    ExcelExportService,
    PdfExportService,
    ToolbarService,
    ContextMenuService,
    ColumnChooserService,
    ReorderService,
    FreezeService,
    RowDDService,
    ColumnMenuService,

    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [AppConfigService]
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
