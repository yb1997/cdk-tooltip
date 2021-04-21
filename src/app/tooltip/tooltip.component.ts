import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { TooltipData } from './tooltip.token';

const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('{{ duration }}ms {{ showDelay }}ms', style({ opacity: 1 })),
  ]),
]);

@Component({
  selector: 'tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  animations: [fadeInOut],
})
export class TooltipComponent {
  constructor(public readonly data: TooltipData) {}

  text!: string;

  ngOnInit() {
    this.text = this.data.text;
  }
}
