import { Component, ElementRef, ViewChild } from '@angular/core';
import { Users } from '../../../common/models/model';
import { CommonService } from 'src/app/demo/service/common.service';
import { ToastrMessageService } from 'src/app/demo/service/toastr.service';
import { environment } from 'src/environments/environment';
import { Table } from 'primeng/table';
import { Roles } from '../../../common/enum/enum';
import { Router } from '@angular/router';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss',
})
export class UsersComponent {
    @ViewChild('thumbnailInput') thumbnailInput: ElementRef;
    isLoading: boolean = true;
    baseUrl: any = environment.avatarUrl;
    cols: any[] = [];
    users: Users[] = [];
    user: Users = {};
    selectedUsers: Users[] = [];
    gender: any[] = [];
    roles: any[] = [];
    userDialog: boolean = false;
    submitted: boolean = false;
    deleteUserDialog: boolean = false;
    thumbnailPhoto: any;
    defaultImg: boolean = false;
    thumbnailName: any;
    thumbnailSizeFlag = false;
    deleteThumbnailFlag: boolean;
    attachThumbanilFile: any;
    thumbnailFile: string = '';
    thumbnailFlag = false;
    selectedThumbnailAttachmentName: string;

    constructor(
        private service: CommonService,
        private toast: ToastrMessageService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.getUsers();
        this.cols = [
            { field: 'avatar', header: 'Avatar' },
            { field: 'userName', header: 'User Name' },
            { field: 'userEmail', header: 'User Email' },
            { field: 'role', header: 'Role' },
            { field: 'gender', header: 'Gender' },
        ];

        this.gender = [
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
        ];
        this.roles = [
            { label: 'SuperAdmin', value: '1' },
            { label: 'Admin', value: '2' },
            { label: 'User', value: '3' },
        ];
        this.thumbnailFile = '';
    }

    thumbnailAttachFileChanged(event: any) {
        if (event.target.files && event.target.files[0]) {
            const fileSize = event.target.files[0].size;
            if (fileSize >= 10000000) {
                this.thumbnailSizeFlag = true;
                this.toast.error(
                    'Thumbnail file size should not be greater than 10MB'
                );
                return;
            } else {
                this.thumbnailSizeFlag = false;
            }

            this.attachThumbanilFile = event.target.files[0];
            this.thumbnailFile = event.target.files[0];

            const reader = new FileReader();

            reader.onload = (e: any) => {
                this.thumbnailPhoto = e.target.result;

                document.getElementById('thumbnailAttachment').innerText =
                    this.thumbnailFile;
                this.thumbnailName = document.getElementById(
                    'val_thumbnailAttachment'
                ).innerText = this.thumbnailFile;
                this.selectedThumbnailAttachmentName = this.thumbnailFile;
                this.thumbnailFlag = true;
                this.deleteThumbnailFlag = false;
                this.toast.info('Info', 'Image selected successfully');
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    deleteAttachFile() {
        this.thumbnailInput.nativeElement.value = null;
        this.thumbnailName = document.getElementById(
            'val_thumbnailAttachment'
        ).innerText = '';
        this.thumbnailFile = '';
        this.attachThumbanilFile = '';
        this.thumbnailFlag = false;
        this.thumbnailPhoto = '';
        this.deleteThumbnailFlag = true;
        this.thumbnailSizeFlag = false;
    }

    clickFileUploaderThumbnail(pretext: any) {
        document.getElementById(pretext).click();
    }

    getUsers() {
        this.isLoading = true;
        setTimeout(() => {
            this.service.getUsers().subscribe(
                (response: any) => {
                    if (response.success) {
                        response.data.forEach((item) => {
                            item.dob = item.dob ? new Date(item.dob) : null;
                        });
                        this.users = response.data;
                        this.isLoading = false;
                    } else {
                        this.toast.error('Error', response.message);
                        this.isLoading = false;
                    }
                },
                (error: any) => {
                    this.toast.error('Error', error.message);
                    this.isLoading = false;
                }
            );
        }, 500);
    }

    saveUser() {
        this.isLoading = true;
        const formData = new FormData();
        formData.append('UserId', this.user.userId ? this.user.userId : 0);
        formData.append('UserName', this.user.userName);
        formData.append('UserEmail', this.user.userEmail);
        formData.append('Password', this.user.password);
        formData.append('Gender', this.user.gender);
        formData.append(
            'Role',
            (this.user.role === Roles.SuperAdmin ? 1 : this.user.role === Roles.Admin ? 2 : 3
            ).toString()
        );

        let date = new Date(this.user.dob);
        date.setHours(0);
        date.setHours(20);
        formData.append('DOB', date.toISOString());

        if (this.user.avatar && !this.user.avatarFile) {
            formData.append('Avatar', this.user.avatar);
        } else if (this.thumbnailFile) {
            formData.append('AvatarFile', this.thumbnailFile);
        }
        this.service.addUser(formData).subscribe(
            (response) => {
                if (response.success) {
                    this.toast.success('Success!', response.message);
                    this.isLoading = false;
                    this.submitted = true;
                    this.userDialog = false;
                    this.getUsers();
                } else {
                    this.toast.error('Error!', response.message);
                    this.isLoading = false;
                }
            },
            (error) => {
                this.toast.error(
                    'Error!',
                    'There is an error while adding user!'
                );
                this.isLoading = false;
            }
        );
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    openNew() {
        this.user = {};
        this.submitted = false;
        this.userDialog = true;
    }

    editUser(useer: Users) {
        this.user = { ...useer };
        this.userDialog = true;
    }

    deleteUser(user: Users) {
        this.deleteUserDialog = true;
        this.user = { ...user };
    }

    confirmDelete() {
        this.deleteUserDialog = false;
    }

    hideDialog() {
        this.thumbnailPhoto = '';
        this.userDialog = false;
        this.submitted = false;
    }
}
