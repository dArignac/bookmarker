import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Toast } from '../../../core/services/toast/toast.model';
import { ToastService } from '../../../core/services/toast/toast.service';

@Component({
  selector: 'app-toast-container',
  imports: [CommonModule],
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.scss',
})
export class ToastContainerComponent {
  toastService = inject(ToastService);
  toasts$ = this.toastService.toasts$;

  getClass(type: Toast['type']): string {
    switch (type) {
      case 'success':
        return 's-notice__success';
      case 'warning':
        return 's-notice__warning';
      case 'error':
        return 's-notice__danger';
      default:
        return 's-notice__info';
    }
  }

  dismiss(id: number) {
    this.toastService.removeToast(id);
  }
}
