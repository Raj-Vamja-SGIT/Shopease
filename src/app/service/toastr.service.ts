import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ToastrService {
  constructor(private toastr: ToastrService) { }

  info(summary?: string, details?: string) {
    this.toastr.info(summary, details);
  }

  warning(summary?: string, details?: string) {
    this.toastr.warning(summary, details);
  }

  error(summary?: string, details?: string) {
    this.toastr.error(summary, details);
  }

  success(summary?: string, details?: string) {
    this.toastr.success(summary, details);
  }
}
