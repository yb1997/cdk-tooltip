import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TooltipComponent } from "./tooltip.component";
import { TooltipDirective } from "./tooltip.directive";
import { OverlayModule } from "@angular/cdk/overlay";
import { TooltipConfig } from "./tooltip.token";

@NgModule({
  declarations: [TooltipDirective, TooltipComponent],
  providers: [
    TooltipConfig
  ],
  imports: [CommonModule, OverlayModule],
  exports: [TooltipDirective],
  entryComponents: [TooltipComponent]
})
export class TooltipModule {}
