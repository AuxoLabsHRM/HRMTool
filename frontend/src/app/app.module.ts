import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
// For MDB Angular Free
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { WavesModule, CardsFreeModule } from 'angular-bootstrap-md';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyNavbarComponent } from './my-navbar/my-navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatTabsModule,
MatDatepickerModule,
MatNativeDateModule,
MatCheckboxModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatRadioModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatOption,
  MatOptgroup,
  MatSnackBarModule,
  MatDialogModule
} from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MyTableComponent } from './my-table/my-table.component';
import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { AdminGuard } from './_guards/';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService } from './_services';
import { DataServiceService } from './data-service.service';
import { EmployeeComponent } from './components/employee/employee.component';
import { AlertComponents } from './alert/alert.component';
import { AddEditDependentComponent } from './components/add-edit-dependent/add-edit-dependent.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    MyNavbarComponent,
    MyTableComponent,
    AlertComponent,
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatTabsModule,
MatDatepickerModule,
MatCheckboxModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    MatNativeDateModule,
    MDBBootstrapModule.forRoot(), // for MDBBootstrapModule
    WavesModule,
    CardsFreeModule
  ],
  providers: [
    DataServiceService,
    AuthGuard,
    AdminGuard,
    AlertService,
    AuthenticationService,
    UserService,
    MatTabsModule,
MatDialogModule,
MatDatepickerModule,
MatNativeDateModule,
MatCheckboxModule,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }

    // provider used to create fake backend
    // fakeBackendProvider
  ],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent],
  entryComponents : [ AlertComponents, AddEditDependentComponent ]
})
export class AppModule {}
