import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class ToastrMessageService {
    constructor(private service: MessageService) {}

    info(summary?: string, details?: string) {
        this.service.add({
            severity: 'info',
            summary: summary,
            detail: details,
        });
    }

    warning(summary?: string, details?: string) {
        this.service.add({
            severity: 'warn',
            summary: summary,
            detail: details,
        });
    }

    error(summary?: string, details?: string) {
        this.service.add({
            severity: 'error',
            summary: summary,
            detail: details,
        });
    }

    success(summary?: string, details?: string) {
        this.service.add({
            severity: 'success',
            summary: summary,
            detail: details,
        });
    }
}
