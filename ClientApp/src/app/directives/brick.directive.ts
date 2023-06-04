import { Directive, ElementRef, Renderer2, Input, HostBinding } from '@angular/core';
import { BrickModel } from '../models/brick.model';

@Directive({
  selector: '[brick]',
})
export class BrickDirective {
  @Input('entity') entity: BrickModel;

  private width = '';
  private height = '';
  private marginLeft = '';
  private marginBottom = '';
  private backgroundColor = '';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'border', '1px solid #746969');
  }

  @HostBinding('style.maxWidth') get getMaxWidth() {
    this.width = `${this.entity.widthPX}px`;
    return this.width;
  }

  @HostBinding('style.maxHeight') get getMaxHeight() {
    this.height = `${this.entity.heightPX}px`;
    return this.height;
  }

  @HostBinding('style.minWidth') get getMinWidth() {
    this.width = `${this.entity.widthPX}px`;
    return this.width;
  }

  @HostBinding('style.minHeight') get getMinHeight() {
    this.height = `${this.entity.heightPX}px`;
    return this.height;
  }

  @HostBinding('style.marginLeft') get getMarginLeft() {
    this.marginLeft = `${this.entity.marginLeft}px`;
    return this.marginLeft;
  }

  @HostBinding('style.marginBottom') get getBottomLeft() {
    this.marginBottom = `${this.entity.marginBottom}px`;
    return this.marginBottom;
  }

  @HostBinding('style.backgroundColor') get getBackgroundColor() {
    this.backgroundColor = this.entity.backgroundColor;
    return this.backgroundColor;
  }
}
