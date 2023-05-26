import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';
import {TabViewModule} from "primeng/tabview";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import { StatisticComponent } from './settings/statistic/statistic.component';
import {TableModule} from "primeng/table";
import { TourLoaderComponent } from './settings/tour-loader/tour-loader.component';
import {TourLoaderService} from "../../services/tour-loader.service";


@NgModule({
  declarations: [
    SettingsComponent,
    StatisticComponent,
    TourLoaderComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    TabViewModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    TableModule

  ],
  providers:[
    MessageService,
    TourLoaderService
  ]

})
export class SettingsModule { }


