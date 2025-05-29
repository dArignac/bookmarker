import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast } from './toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toastsSubject.asObservable();

  private currentId = 0;

  showToast(message: string, type: Toast['type'] = 'info', duration = 5000) {
    const id = this.currentId++;
    const newToast: Toast = { id, message, type };
    const currentToasts = this.toastsSubject.getValue();
    this.toastsSubject.next([...currentToasts, newToast]);

    setTimeout(() => this.removeToast(id), duration);
  }

  removeToast(id: number) {
    const updatedToasts = this.toastsSubject.getValue().filter((t) => t.id !== id);
    this.toastsSubject.next(updatedToasts);
  }
}
