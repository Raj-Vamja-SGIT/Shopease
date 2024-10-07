import { UserProfile } from './../../../common/models/model';
import { EncryptionService } from './../../../../service/encryption.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/demo/service/common.service';
import { ToastrMessageService } from 'src/app/demo/service/toastr.service';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/demo/service/user.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
    @ViewChild('thumbnailInput') thumbnailInput: ElementRef;
    isLoading: boolean = false;
    gender: any[] = [];
    thumbnailPhoto: any;
    defaultImg: boolean = false;
    thumbnailName: any;
    thumbnailSizeFlag = false;
    deleteThumbnailFlag: boolean;
    attachThumbanilFile: any;
    thumbnailFile: string = '';
    thumbnailFlag = false;
    selectedThumbnailAttachmentName: string;
    userId: any;
    baseUrl: any = environment.avatarUrl;

    UserProfile: UserProfile = {
        UserId: '',
        UserName: '',
        UserEmail: '',
        Password: '',
        DOB: '',
        Gender: '',
        AvatarFile: null,
        Avatar: '',
    };

    constructor(
        private toastr: ToastrMessageService,
        private service: CommonService,
        private encryptionService: EncryptionService,
        private userService: UserService
    ) {}
    ngOnInit(): void {
        this.gender = [
            { name: 'Male', value: 'Male' },
            { name: 'Female', value: 'Female' },
        ];
        this.userId =
            this.encryptionService.getDecryptedData('authData')?.userId;
        this.getUserProfile();
        console.log(this.encryptionService.getDecryptedData('authData'));
        
    }

    thumbnailAttachFileChanged(event: any) {
        if (event.target.files && event.target.files[0]) {
            const fileSize = event.target.files[0].size;
            if (fileSize >= 10000000) {
                this.thumbnailSizeFlag = true;
                this.toastr.error(
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
                this.toastr.info('Info', 'Image uploaded successfully');
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
        // document.getElementById('thumbnailfile').style.background = '#3f51b5';
        this.thumbnailSizeFlag = false;
    }

    clickFileUploaderThumbnail(pretext: any) {
        document.getElementById(pretext).click();
    }

    getUserProfile() {
        this.isLoading = true;
        this.service.getUserProfileDetails(this.userId).subscribe(
            (response) => {
                if (response.success) {
                    const userData = response.data;
                    const {
                        userId,
                        userName,
                        userEmail,
                        password,
                        dob,
                        gender,
                        avatar,
                    } = userData;
                    this.UserProfile = {
                        UserId: userId,
                        UserName: userName,
                        UserEmail: userEmail,
                        Password: password,
                        DOB: dob ? new Date(dob) : null,
                        Gender: gender,
                        Avatar: avatar,
                    };
                    this.userService.updateAvatar(avatar);
                    this.isLoading = false;
                } else {
                    this.toastr.error(
                        'Error!',
                        'Something went wrong, please try again later.'
                    );
                    this.isLoading = false;
                }
            },
            (error) => {
                this.toastr.error(
                    'Error!',
                    'There is an error occured while fetching user profile details.'
                );
                this.isLoading = false;
            }
        );
    }

    onSubmit(userProfileForm: any) {
        this.isLoading = true;
        const formData = new FormData();
        formData.append('UserId', this.userId.toString());
        formData.append('UserName', userProfileForm.form.value.userName);
        formData.append('UserEmail', userProfileForm.form.value.userEmail);
        formData.append('Password', userProfileForm.form.value.password);
        formData.append('Gender', userProfileForm.form.value.gender);

        let date = new Date(userProfileForm.form.value.dob);
        date.setHours(0);
        date.setHours(20);
        formData.append('DOB', date.toISOString());

        if (this.thumbnailFile) {
            formData.append('AvatarFile', this.thumbnailFile);
        }
        setTimeout(() => {
            this.service.updateUserProfile(formData).subscribe(
                (response) => {
                    if (response.success) {
                        this.toastr.success('Success!', response.message);
                        this.isLoading = false;
                        this.getUserProfile();
                    } else {
                        this.toastr.error('Error!', response.message);
                        this.isLoading = false;
                    }
                },
                (error) => {
                    this.toastr.error(
                        'Error!',
                        'There is an error while updating the user profile!'
                    );
                    this.isLoading = false;
                }
            );
        }, 900);
    }
}
