import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToastComponent {
  @Input() message = '';
  @Input() title = 'Atenção';
  @Input() type: 'success' | 'warning' | 'danger' | 'info' = 'warning';
  @Input() duration = 3000; 
  @Output() closed = new EventEmitter<void>();

  private _show = false;
  private timeoutId?: number;

  @Input()
  set show(value: boolean) {
    this._show = value;
    if (value) {
      this.startAutoHideTimer();
    } else {
      this.clearAutoHideTimer();
    }
  }
  get show(): boolean {
    return this._show;
  }

  get headerClass(): string {
    return {
      success: 'bg-success',
      warning: 'bg-warning',
      danger: 'bg-danger',
      info: 'bg-info'
    }[this.type];
  }

  get bodyClass(): string {
    return {
      success: 'bg-success-subtle',
      warning: 'bg-warning-subtle',
      danger: 'bg-danger-subtle',
      info: 'bg-info-subtle'
    }[this.type];
  }

  get iconClass(): string {
    return {
      success: 'bi-check-circle-fill',
      warning: 'bi-exclamation-triangle-fill',
      danger: 'bi-x-circle-fill',
      info: 'bi-info-circle-fill'
    }[this.type];
  }

  private startAutoHideTimer(): void {
    this.clearAutoHideTimer();
    if (this.duration > 0) {
      this.timeoutId = window.setTimeout(() => {
        this.onClose();
      }, this.duration);
    }
  }

  private clearAutoHideTimer(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }

  onClose(): void {
    this._show = false;
    this.clearAutoHideTimer();
    this.closed.emit();
  }
}
