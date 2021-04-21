import {
  ConnectedPosition,
  Overlay,
  OverlayConfig,
  OverlayRef,
  PositionStrategy,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  Directive,
  ElementRef,
  HostListener,
  Injector,
  Input,
} from '@angular/core';
import { TooltipComponent } from './tooltip.component';
import { TooltipConfig, TooltipData } from './tooltip.token';

type Pos = 'top' | 'bottom' | 'left' | 'right';

@Directive({
  selector: '[tooltip]',
})
export class TooltipDirective {
  constructor(
    private readonly injector: Injector,
    private readonly overlay: Overlay,
    private readonly el: ElementRef,
    private readonly tooltipConfig: TooltipConfig
  ) {}

  @Input('tooltip')
  text = '';

  @Input()
  tooltipPosition: Pos = this.tooltipConfig.tooltipPosition;

  @Input()
  showDelay = this.tooltipConfig.showDelay;

  @Input("tooltipShowDuration")
  duration = this.tooltipConfig.duration;

  private overlayRef!: OverlayRef;

  private static tooltipPositionMap = new Map<Pos, ConnectedPosition>([
    [
      'bottom',
      {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
      },
    ],
    [
      'top',
      {
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
      },
    ],
    [
      'left',
      {
        originX: 'start',
        originY: 'center',
        overlayX: 'end',
        overlayY: 'center',
      },
    ],
    [
      'right',
      {
        originX: 'end',
        originY: 'center',
        overlayX: 'start',
        overlayY: 'center',
      },
    ],
  ]);

  private static alternativePosition = new Map<Pos, ConnectedPosition>([
    [
      'left',
      TooltipDirective.tooltipPositionMap.get('right') as ConnectedPosition,
    ],
    [
      'right',
      TooltipDirective.tooltipPositionMap.get('left') as ConnectedPosition,
    ],
    [
      'top',
      TooltipDirective.tooltipPositionMap.get('bottom') as ConnectedPosition,
    ],
    [
      'bottom',
      TooltipDirective.tooltipPositionMap.get('top') as ConnectedPosition,
    ],
  ]);

  @HostListener('mouseenter')
  onMouseEnter() {
    if (!this.text) return;

    this.createPortalOutlet();
    this.show();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.overlayRef.dispose();
  }

  private createPortalOutlet() {
    const positionStrategy = this.createPositionStrategy();

    const overlayConfig = new OverlayConfig({
      positionStrategy,
      hasBackdrop: false,
    });
    this.overlayRef = this.overlay.create(overlayConfig);
  }

  private createPositionStrategy(): PositionStrategy {
    /**
     * use fallback position if no values are received via constructor
     */
    const fallbackPos = TooltipDirective.tooltipPositionMap.get(
      'bottom'
    ) as ConnectedPosition;
    const prefferedPos = TooltipDirective.tooltipPositionMap.get(
      this.tooltipPosition
    );

    /**
     * use alternative position when there's not enough space to show in preffered position
     */
    const alternativePos = TooltipDirective.alternativePosition.get(
      this.tooltipPosition
    ) as ConnectedPosition;

    return this.overlay
      .position()
      .flexibleConnectedTo(this.el)
      .withPositions([prefferedPos || fallbackPos, alternativePos]);
  }

  private show() {
    const injector = this.createInjector();
    const compPortal = new ComponentPortal(TooltipComponent, null, injector);

    this.overlayRef.attach(compPortal);
  }

  private createInjector(): Injector {
    const tooltipData = new TooltipData();
    tooltipData.text = this.text;
    tooltipData.showDelay = this.showDelay;
    tooltipData.duration = this.duration;

    return Injector.create({
      parent: this.injector,
      providers: [{ provide: TooltipData, useValue: tooltipData }],
    });
  }

  ngOnDestroy() {
    this.overlayRef.dispose();
  }
}
