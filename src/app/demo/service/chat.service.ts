import { Message } from './../components/common/models/model';
import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { EncryptionService } from './encryption.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    baseUrl: any = environment.chatHubUrl;
    userId: any;
    _hubConnection!: HubConnection;
    Messages = new EventEmitter<Message>();
    OnlineUsers = new EventEmitter<any>();
    Typing = new EventEmitter<Boolean>();

    constructor(public encryptionService: EncryptionService) {}

    public createConnection() {
        this.userId =
            this.encryptionService.getDecryptedData('authData')?.userId;

        this._hubConnection = new HubConnectionBuilder()
            .withUrl(this.baseUrl + this.userId)
            .build();
    }

    public startConnection(): void {
        this._hubConnection
            .start()
            .then((data) => {
                this.userId;
            })

            .catch((err) => {
                setTimeout(() => {
                    this.startConnection();
                }, 5000);
            });
    }

    public registerEvents() {
        this._hubConnection.on('GetAllMessages', (data: any) => {
            this.Messages.emit(data.data);
        });
        this._hubConnection.on('SendMessages', (data: any) => {
            this.Messages.emit(data.data);
        });
        this._hubConnection.on('TypingNotification', (data: boolean) => {
            this.Typing.emit(data);
        });
        this._hubConnection.on('OnlineUser', (data: any) => {
            this.OnlineUsers.emit(data.data);
        });
    }

    public GetAllMessage(model: any) {
        this._hubConnection
            .send('GetAllMessage', model)
            .then((data: any) => {});
    }
    public OnlineUser(id: any) {
        this._hubConnection.send('OnlineUser', id);
    }
    public sendMessage(model: any) {
        this._hubConnection.send('SendMessages', model).then((data: any) => {});
    }
    public TypingNotification(id: any) {
        this._hubConnection
            .send('TypingNotification', id)
            .then((data: any) => {});
    }
}
