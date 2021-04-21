import { Injectable } from "@angular/core";

const DEFAULT_SHOW_DELAY = 500;
const DEFAULT_TOOLTIP_DURATION = 400;

@Injectable()
export class TooltipConfig {
  tooltipPosition: "left" | "right" | "top" | "bottom" = "bottom";
  showDelay = DEFAULT_SHOW_DELAY;
  duration = DEFAULT_TOOLTIP_DURATION;
}

export class TooltipData {
  text!: string;
  showDelay!: number;
  duration!: number;
};

