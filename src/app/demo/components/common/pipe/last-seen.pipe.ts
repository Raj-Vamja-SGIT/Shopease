import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'lastSeen',
})
export class LastSeenPipe implements PipeTransform {
    transform(
        value: Date | string | number,
        showToday: boolean = false
    ): string {
        if (!value) return '';

        const inputDate = new Date(value);
        const now = new Date();

        // Reset hours for comparison
        const todayStart = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        );
        const yesterdayStart = new Date(todayStart);
        yesterdayStart.setDate(todayStart.getDate() - 1);

        // Format time as 'hh:mm a'
        const timeOptions: Intl.DateTimeFormatOptions = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };
        const timeString = inputDate.toLocaleTimeString('en-US', timeOptions);

        if (inputDate >= todayStart) {
            if (showToday) {
                // If the date is today and need date for diveder, show only the time
                return `Today`;
            } else {
                // If the date is today, show only the time
                return timeString;
            }
        } else if (inputDate >= yesterdayStart) {
            // If the date is yesterday, show 'Yesterday'
            return `Yesterday`;
        } else if (this.isWithinLastWeek(inputDate, todayStart)) {
            // If the date is within the past week, show day name
            return inputDate.toLocaleDateString('en-US', { weekday: 'long' });
        } else {
            // Otherwise, show 'MM/dd/yyyy' for older dates
            return inputDate.toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
            });
        }
    }

    private isWithinLastWeek(inputDate: Date, todayStart: Date): boolean {
        const diffInMs = todayStart.getTime() - inputDate.getTime();
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        return diffInDays >= 1 && diffInDays < 7;
    }
}
