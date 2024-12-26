import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnectRoutingModule } from './connect-routing.module';
import { ConnectComponent } from './connect/connect.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { LastSeenPipe } from '../../common/pipe/last-seen.pipe';
import { ToastModule } from 'primeng/toast';
import { AvatarModule } from 'primeng/avatar';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { NotificationComponent } from '../../common/notification/notification/notification.component';

@NgModule({
    declarations: [ConnectComponent, LastSeenPipe],
    imports: [
        CommonModule,
        ConnectRoutingModule,
        ButtonModule,
        FormsModule,
        InputTextModule,
        DividerModule,
        ToastModule,
        AvatarModule,
        RippleModule,
        NotificationComponent
    ],
    providers: [MessageService]
})
export class ConnectModule {}
