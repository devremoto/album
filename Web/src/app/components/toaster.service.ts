import { Injectable } from '@angular/core';
import { ActiveToast, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  count = 0;
  constructor(private toastr: ToastrService) {
  }
  pop(type, message, title?: string) {
    switch (type) {
      case 'error':
        return this.error(message, title);
      case 'success':
        return this.success(message, title);
      case 'warning':
        return this.warning(message, title);
      case 'info':
        return this.info(message, title);
      case 'danger':
        return this.danger(message, title);
      default:
        return this.primary(message, title);
    }
  }

  show(message?: string, title?: string, type?: string): ActiveToast<any> {
    if (this.shouldOpen(message, title)) {
      return this.toastr.show(message, title, null, type);
    }
  }

  success(message?: string, title?: string): ActiveToast<any> {
    if (this.shouldOpen(message, title)) {
      return this.toastr.success(message, title);
    }
  }

  error(message?: string, title?: string): ActiveToast<any> {
    if (this.shouldOpen(message, title)) {
      return this.toastr.error(message, title);
    }
  }

  info(message?: string, title?: string): ActiveToast<any> {
    if (this.shouldOpen(message, title)) {
      return this.toastr.info(message, title);
    }
  }

  warning(message?: string, title?: string): ActiveToast<any> {
    if (this.shouldOpen(message, title)) {
      return this.toastr.warning(message, title);
    }
  }

  danger(message?: string, title?: string): ActiveToast<any> {
    if (this.shouldOpen(message, title)) {
      return this.toastr.error(message, title);
    }
  }

  primary(message?: string, title?: string): ActiveToast<any> {
    if (this.shouldOpen(message, title)) {
      return this.show(message, title, 'primary');
    }
  }

  default(message?: string, title?: string): ActiveToast<any> {
    if (this.shouldOpen(message, title)) {
      return this.show(message, title, 'default');
    }
  }

  shouldOpen(message?: string, title?: string): boolean {
    return message.trim() != null;
  }

}
