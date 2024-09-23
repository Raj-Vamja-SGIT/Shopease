import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrMessageService } from 'src/app/demo/service/toastr.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
    @ViewChild('thumbnailInput') thumbnailInput: ElementRef;
    gender: any[] = [];
    selectedValue: string = '';
    thumbnailPhoto: any;
    defaultImg: boolean = false;
    thumbnailName: any;
    thumbnailSizeFlag = false;
    deleteThumbnailFlag: boolean;
    attachThumbanilFile: any;
    thumbnailFile: string = '';
    thumbnailFlag = false;
    selectedThumbnailAttachmentName: string;

    constructor(private toastr: ToastrMessageService) {}
    ngOnInit(): void {
        this.gender = [
            { name: 'Male', value: 'Male' },
            { name: 'Female', value: 'Female' },
        ];
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
            this.thumbnailFile = event.target.files[0].name;

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
                this.toastr.info('Info', 'Image uploaded successfully')
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
        document.getElementById('thumbnailfile').style.background = '#3f51b5';
        this.thumbnailSizeFlag = false;
    }

    clickFileUploaderThumbnail(pretext: any) {
        document.getElementById(pretext).click();
    }

    onSave(){
        
    }
}
