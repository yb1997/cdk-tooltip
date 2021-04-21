import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { TooltipModule } from './tooltip/tooltip.module';
import { TooltipConfig } from './tooltip/tooltip.token';

/**
 * Global tooltip configuration, for individual tooltips pass values to input properties of directive
 */
const tooltipConfig = new TooltipConfig();
tooltipConfig.duration = 1000;
tooltipConfig.showDelay = 1000;

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, TooltipModule],
  providers: [
    {
      provide: TooltipConfig,
      useValue: tooltipConfig
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
