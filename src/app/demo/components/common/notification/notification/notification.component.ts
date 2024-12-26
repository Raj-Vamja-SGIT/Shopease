import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-notification',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './notification.component.html',
    styleUrl: './notification.component.scss',
})
export class NotificationComponent {
    @Input() userImage: string = '';
    @Input() userName: string = '';
    @Input() messageContent: string = '';
    @Input() duration: number = 5000;
    @Input() isVisible: boolean = false;

    ngOnInit(): void {
        // this.autoClose();
    }

    closeNotification(): void {
        this.isVisible = false;
    }

    private autoClose(): void {
        //setTimeout(() => {
            this.isVisible = false;
        //}, this.duration);
    }
}
