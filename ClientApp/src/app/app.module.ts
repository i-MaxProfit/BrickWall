import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { BrickDirective } from './directives/brick.directive';
import { ReversePipe } from './pipes/reverse.pipe';
import { BrickTypeService } from './services/brick-type.service';
import { BrickOptionService } from './services/brick-option.service';

@NgModule({
  declarations: [AppComponent, HomeComponent, BrickDirective, ReversePipe],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([{ path: '', component: HomeComponent, pathMatch: 'full' }]),
  ],
  providers: [BrickTypeService, BrickOptionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
