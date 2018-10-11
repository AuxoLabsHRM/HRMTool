import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './_guards';
import { AdminGuard } from './_guards/';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { TechDetailsComponent } from './components/tech-details/tech-details.component';
import { TechDetailOverviewComponent } from './components/tech-detail-overview/tech-detail-overview.component';
import { TechDetailContactComponent } from './components/tech-detail-contact/tech-detail-contact.component';
import { TopLanguagesComponent } from './components/top-languages/top-languages.component';
import { AllLanguagesComponent } from './components/all-languages/all-languages.component';
import { UpcomingLanguagesComponent } from './components/upcoming-languages/upcoming-languages.component';
import { AddTechnologyComponent } from './components/add-technology/add-technology.component';
import { EditTechnologyComponent } from './components/edit-technology/edit-technology.component';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';
import { EmergencyContactsComponent } from './components/emergency-contacts/emergency-contacts.component';
import { EditUpdateEmergencyComponent } from './components/edit-update-emergency/edit-update-emergency.component';
import { DependentsComponent } from './components/dependents/dependents.component';
import { AddEditDependentComponent } from './components/add-edit-dependent/add-edit-dependent.component';
import { QualificationsComponent } from './components/qualifications/qualifications.component';
import { AddSkillComponent } from './components/add-skill/add-skill.component';
import { AddEducationdtlComponent } from './components/add-educationdtl/add-educationdtl.component';
import { LanguagesComponent } from './components/languages/languages.component';
import { AlertComponents } from './alert/alert.component';
import { ApplyLeaveComponent } from './components/leavemanagement/apply-leave/apply-leave.component';
import { LeaveComponent } from './components/leavemanagement/leave/leave.component';
import { LeaveapprovalComponent } from './components/leavemanagement/leaveapproval/leaveapproval.component';
import { EmployeeactivateComponent } from './components/admin/employeeactivate/employeeactivate.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { label: 'Home', icon: 'home', isLoggedIn: true },
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { label: 'About Auxo', icon: 'person', isLoggedIn: true }
  },
  {
    path: 'login',
    component: LoginComponent
    // data: { label: 'Login', icon: 'power_settings_new', isLoggedIn: true}
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'top-technologies',
    component: TopLanguagesComponent,
    data: { sideNaveLabel: 'Top 10 Technologies' }
  },
  {
    path: 'all-technologies',
    component: AllLanguagesComponent,
    data: { sideNaveLabel: 'All Technologies' },
    children: [
      { path: 'add-tech', component: AddTechnologyComponent },
      { path: 'edit-tech/:techId', component: EditTechnologyComponent }
    ]
  },
  {
    path: 'all-technologies/:id',
    component: TechDetailsComponent,
    children: [
      { path: 'overview', component: TechDetailOverviewComponent },
      { path: 'contact', component: TechDetailContactComponent }
    ]
  },
  {
    path: 'upComing-technologies',
    component: UpcomingLanguagesComponent,
    data: { sideNaveLabel: 'UpComing Technologies' }
  },
  {
    path: 'dashboard',
    component: MyDashboardComponent,
    data: { sideNaveLabel: 'Dashboard' }
  },
  {
    path: 'emergency_contact',
    component: EmergencyContactsComponent,
    data: { sideNaveLabel: 'Emergency Contacts' }
  },
  {
    path: 'dependent',
    component: DependentsComponent,
    data: { sideNaveLabel: 'Dependents' }
  },
  {
    path: 'emergency_contact/:action/:id',
    component: EditUpdateEmergencyComponent
  },
  {
    path:'Qualifications',
    component: QualificationsComponent,
    data: { sideNaveLabel: 'Qualifications'}
    },
    {
    path:'addskill',
    component: AddSkillComponent
    },
    {
    path:'addeducation',
    component: AddEducationdtlComponent
    },
    {
    path:'languages',
    component: LanguagesComponent
    },
    {
      path: 'Activate',
      component: EmployeeactivateComponent,
      data: { sideNaveLabel: 'Activate- Admin'}
    },
    {
      path: 'applyleave-Admin',
      component: LeaveapprovalComponent,
      data: { sideNaveLabel: 'Apply leave-Admin'}
    },
    {
      path: 'leave',
      component: LeaveComponent,
      data: { sideNaveLabel: 'Leave' }
    },
    {
      path: 'Applyleave',
      component: ApplyLeaveComponent,
    },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [
  HomeComponent,
  AboutComponent,
  LoginComponent,
  RegisterComponent,
  PageNotFoundComponent,
  DepartmentsComponent,
  TechDetailsComponent,
  TechDetailOverviewComponent,
  TechDetailContactComponent,
  TopLanguagesComponent,
  AllLanguagesComponent,
  UpcomingLanguagesComponent,
  AddTechnologyComponent,
  EditTechnologyComponent,
  MyDashboardComponent,
  EmergencyContactsComponent,
  EditUpdateEmergencyComponent,
  DependentsComponent,
  AddEditDependentComponent,
  QualificationsComponent,
  AddSkillComponent,
  AddEducationdtlComponent,
  LanguagesComponent,
  AlertComponents,
  ApplyLeaveComponent,
  LeaveComponent,
  LeaveapprovalComponent,
  EmployeeactivateComponent
];
