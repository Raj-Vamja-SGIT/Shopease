import { Message } from './../../../common/models/model';
import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/demo/service/common.service';
import { ToastrMessageService } from 'src/app/demo/service/toastr.service';
import { SederDetails, Users } from '../../../common/models/model';
import { environment } from 'src/environments/environment';
import { EncryptionService } from 'src/app/demo/service/encryption.service';
import { ChatService } from 'src/app/demo/service/chat.service';

@Component({
    selector: 'app-connect',
    templateUrl: './connect.component.html',
    styleUrl: './connect.component.scss',
})
export class ConnectComponent {
    @ViewChild('scrollContainer', { static: false })
    private scrollContainer!: ElementRef;

    users: Users[] = [];
    selectedContact: any = null;
    newMessage = '';
    baseUrl: any = environment.avatarUrl;
    userId: any;
    userList: any;
    messages: any = new Array<Message>();
    lastActive: any;
    Typing: boolean | undefined;
    isVisible: boolean = false;
    sender: SederDetails = {};

    constructor(
        private readonly service: CommonService,
        private readonly toast: ToastrMessageService,
        public encryptionService: EncryptionService,
        public readonly chatService: ChatService,
        private ngZone: NgZone
    ) {
        this.userId =
            this.encryptionService.getDecryptedData('authData')?.userId;
        this.registerOnEvents();
    }

    ngOnInit(): void {
        this.getUsers();

        this.chatService.createConnection();
        this.chatService.startConnection();
        this.chatService.registerEvents();
    }

    ngAfterViewChecked(): void {
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        if (this.scrollContainer && this.scrollContainer.nativeElement) {
            this.scrollContainer.nativeElement.scrollTop =
                this.scrollContainer.nativeElement.scrollHeight;
        }
    }

    registerOnEvents() {
        this.chatService.Messages.subscribe((data: any) => {
            this.ngZone.run(() => {
                this.messages = this.addIsGroupedFlag(data);

                this.sender.senderId = this.messages[0].toUserId;
                this.sender.receiverId = this.messages[0].fromUserId;
                this.sender.senderMsg = this.messages[0].message;
                if (
                    this.sender.receiverId == this.userId &&
                    this.sender.senderMsg
                ) {
                    this.isVisible = true;
                }
            });
        });
        this.chatService.Typing.subscribe((data: boolean) => {
            this.ngZone.run(() => {
                this.Typing = data;
            });
            setTimeout(() => {
                this.Typing = false;
            }, 1500);
        });
        this.chatService.OnlineUsers.subscribe((data: any) => {
            this.ngZone.run(() => {
                this.userList = data;
            });
        });
    }

    addIsGroupedFlag(data: any[]): any[] {
        if (!data || data.length === 0) return [];

        return data.map((item, index) => ({
            ...item,
            isGrouped:
                index > 0 &&
                new Date(item.createdDate).toISOString().slice(0, 10) ===
                    new Date(data[index - 1].createdDate)
                        .toISOString()
                        .slice(0, 10),
        }));
    }

    getUsers() {
        setTimeout(() => {
            this.service.getUsers().subscribe(
                (response: any) => {
                    if (response.success) {
                        response.data.forEach((item) => {
                            item.dob = item.dob ? new Date(item.dob) : null;
                        });
                        this.users = response.data;
                        this.userList = this.users.filter(
                            (x) => x.userId != this.userId && x.role != 'User'
                        );
                        this.getLastMessages();
                    } else {
                        this.toast.error('Error', response.message);
                    }
                },
                (error: any) => {
                    this.toast.error('Error', error.message);
                }
            );
        }, 500);
    }

    getLastMessages() {
        if (this.userId > 0) {
            this.service
                .getLastMessages(this.userId)
                .subscribe((response: any) => {
                    if (response.success && response.data) {
                        this.userList.forEach((user) => {
                            const lastMessage = response.data.find(
                                (message: any) =>
                                    message.toUserId === user.userId
                            );
                            user.lastMessage = lastMessage
                                ? lastMessage.message
                                : null;
                            user.lastMessageDate = lastMessage
                                ? lastMessage.createdDate
                                : null;
                        });
                    }
                });
        }
    }

    MessageView(contact: any) {
        const obj = {
            FromUserId: this.userId,
            ToUserId: contact.userId,
        };
        this.chatService.GetAllMessage(obj);

        this.selectedContact = contact;
        this.lastActive = this.getTimeAgo(this.selectedContact.logOutTime);
        this.selectedContact = {
            ...this.selectedContact,
        };
    }

    getTimeAgo(dateString: string): string {
        const now = new Date();
        const date = new Date(dateString);
        const diffMs = now.getTime() - date.getTime();

        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHours = Math.floor(diffMin / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffSec < 60) {
            return `Last active ${diffSec} second${diffSec > 1 ? 's' : ''} ago`;
        } else if (diffMin < 60) {
            return `Last active ${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
        } else if (diffHours < 24) {
            return `Last active ${diffHours} hour${
                diffHours > 1 ? 's' : ''
            } ago`;
        } else if (diffDays < 30) {
            return `Last active ${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        } else {
            return '';
        }
    }

    SendMessage(contact: any) {
        if (this.newMessage.trim()) {
            const obj = {
                FromUserId: this.userId ? this.userId : 0,
                ToUserId: contact.userId ? contact.userId : 0,
                Message: this.newMessage.trim(),
            };
            this.messages.push(obj);
            this.chatService.sendMessage(obj);
            this.chatService.GetAllMessage(obj);
            const index = this.userList.findIndex(
                (x) => x.userId == obj.ToUserId
            );
            if (index > -1) {
                this.userList[index].lastMessage = this.newMessage.trim();
                const lastMessageDateTime = this.formatDate(new Date());
                this.userList[index].lastMessageDate = lastMessageDateTime;
            }
            this.newMessage = '';
            // Scroll to the bottom after adding the new message
            setTimeout(() => this.scrollToBottom(), 0);
        }
    }

    formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        const seconds = ('0' + date.getSeconds()).slice(-2);
        const milliseconds = '000';

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
    }

    TypingNotiFication(id: any) {
        this.chatService.TypingNotification(id);
    }
}
