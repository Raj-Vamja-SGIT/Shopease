import { Categories, Product } from './../../../common/models/model';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/demo/service/common.service';
import { ToastrMessageService } from 'src/app/demo/service/toastr.service';
import { Brands } from '../../../common/models/model';
import { environment } from 'src/environments/environment';
import {
    ClassicEditor,
    Bold,
    Essentials,
    Heading,
    Indent,
    IndentBlock,
    Italic,
    Link,
    List,
    Paragraph,
    Table,
    Undo,
} from 'ckeditor5';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { EncryptionService } from 'src/app/demo/service/encryption.service';
import {
    CdkDragDrop,
    moveItemInArray,
    transferArrayItem,
} from '@angular/cdk/drag-drop';

interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

@Component({
    selector: 'app-product-master',
    templateUrl: './product-master.component.html',
    styleUrl: './product-master.component.scss',
})
export class ProductMasterComponent {
    baseUrl: any = environment.productImageUrl;
    isLoading: boolean = false;
    uploadedFiles: any[] = [];
    brands: Brands[] = [];
    categories: Categories[] = [];
    Category: any = null;
    Brand: Brands = {};
    visible: boolean = false;
    selectedFile: any = null;
    _id: any;
    isEdit: boolean = false;
    responsiveOptions: any[] | undefined;
    loginId: any;

    ProductDetails: Product = {
        ProductId: '',
        ProductName: '',
        ProductDescription: '',
        Price: '',
        Discount: '',
        StockStatus: '',
        SKU: '',
        Category: null,
        Brand: null,
        Rating: 0,
        ImageUrls: '',
        ImageFiles: '',
    };

    selectedFiles: any[] = [];
    oldFiles = [];
    items: MenuItem[] | undefined;
    home: MenuItem | undefined;
    ABC: MenuItem | undefined;

    public Editor = ClassicEditor;
    public config = {
        toolbar: [
            'undo',
            'redo',
            '|',
            'heading',
            '|',
            'bold',
            'italic',
            '|',
            'link',
            'insertTable',
            '|',
            'bulletedList',
            'numberedList',
            'indent',
            'outdent',
        ],
        plugins: [
            Bold,
            Essentials,
            Heading,
            Indent,
            IndentBlock,
            Italic,
            Link,
            List,
            Paragraph,
            Table,
            Undo,
        ],
    };

    constructor(
        private readonly service: CommonService,
        private readonly toast: ToastrMessageService,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly encryptionService: EncryptionService,
        private readonly confirmationService: ConfirmationService
    ) {
        this._id = this.route.snapshot.params['id'];
        if (this._id > 0 && this._id != null) {
            this.isEdit = true;
        }
    }

    ngOnInit(): void {
        this.getProductDetails();
        this.getProductImages();
        this.getCategories();
        this.responsiveOptions = [
            {
                breakpoint: '1199px',
                numVisible: 1,
                numScroll: 1,
            },
            {
                breakpoint: '991px',
                numVisible: 2,
                numScroll: 1,
            },
            {
                breakpoint: '767px',
                numVisible: 1,
                numScroll: 1,
            },
        ];

        this.items = [
            { icon: 'pi pi-home', route: '/shopease/dashboard' },
            { label: 'Products', route: '/shopease/pages/products' },
        ];
        this.loginId =
            this.encryptionService.getDecryptedData('authData')?.userId;
    }

    getProductDetails() {
        if (this._id > 0 && this._id != null) {
            this.isLoading = true;
            setTimeout(() => {
                this.service.getProductDetails(this._id).subscribe(
                    (response: any) => {
                        if (response.success) {
                            this.isEdit = true;

                            this.ProductDetails.ProductId =
                                response.data.productId;
                            this.ProductDetails.ProductName =
                                response.data.productName;
                            this.ProductDetails.ProductDescription =
                                response.data.productDescription;
                            this.ProductDetails.Price = response.data.price;
                            this.ProductDetails.Discount =
                                response.data.discount;
                            this.ProductDetails.StockStatus =
                                response.data.stockStatus;
                            this.ProductDetails.SKU = response.data.sku;
                            this.ProductDetails.Category = Number(
                                response.data.category
                            );
                            this.ProductDetails.Brand = Number(
                                response.data.brand
                            );
                            this.ProductDetails.Rating = response.data.rating;

                            if (this.ProductDetails.Category > 0) {
                                this.getBrands(this.ProductDetails.Category);
                            }
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
    }

    getCategories() {
        this.service.getCategories().subscribe((response: any) => {
            if (response.success) {
                this.categories = response.data;
            }
        });
    }

    getBrands(categoryId: number) {
        if (categoryId > 0) {
            this.service.getBrands(categoryId).subscribe((response: any) => {
                if (response.success) {
                    this.brands = response.data;
                }
            });
        }
    }

    showDialog() {
        this.visible = true;
    }

    extractOriginalFileName(encryptedFileName: string): string {
        const parts = encryptedFileName.split('_');
        return parts.slice(1).join('_');
    }

    getProductImages() {
        if (this._id && this._id != undefined) {
            this.isLoading = true;
            setTimeout(() => {
                this.service.getProductImages(this._id).subscribe(
                    (response: any) => {
                        if (response.success) {
                            const imgs = response.data;

                            let filesDetails: any[] = [];

                            for (let i = 0; i < imgs.length; i++) {
                                const id = imgs[i].imageId;
                                const imageOrderNumber =
                                    imgs[i].imageOrderNumber;
                                const name = this.extractOriginalFileName(
                                    imgs[i].imageUrls
                                );

                                filesDetails.push({
                                    imageOrderNumber: imageOrderNumber,
                                    id: id,
                                    name: name,
                                    url: this.baseUrl + imgs[i].imageUrls,
                                });
                            }
                            this.oldFiles = filesDetails;

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
    }

    onFileChange(event: any) {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = () => {
                this.selectedFiles.push({
                    file: file,
                    name: file.name,
                    preview: reader.result,
                });
            };
            reader.readAsDataURL(file);
        }
    }

    onDrop(event: DragEvent) {
        event.preventDefault();
        const files = event.dataTransfer?.files;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();
                reader.onload = () => {
                    this.selectedFiles.push({
                        file: file,
                        name: file.name,
                        preview: reader.result,
                    });
                };
                reader.readAsDataURL(file);
            }
        }
    }

    onDragOver(event: DragEvent) {
        event.preventDefault();
    }

    onDragLeave(event: DragEvent) {}

    onUploadFile(files: any) {
        if (files.length > 0) {
            this.isLoading = true;
            const formData = new FormData();
            formData.append('ProductId', this._id);
            // Loop through the files and append each file individually
            for (let i = 0; i < files.length; i++) {
                formData.append('ImageFiles', files[i].file);
            }

            setTimeout(() => {
                this.service.addProductImage(formData).subscribe(
                    (response) => {
                        if (response.success) {
                            this.toast.success('Success!', response.message);
                            files.length = 0;
                            this.getProductDetails();
                            this.isLoading = false;
                        } else {
                            this.toast.error('Error!', response.message);
                            this.isLoading = false;
                        }
                    },
                    (error) => {
                        this.toast.error(
                            'Error!',
                            'There is an error while upload the product image!'
                        );
                        this.isLoading = false;
                    }
                );
            }, 900);
        }
    }

    removeNewFile(index: number) {
        this.selectedFiles.splice(index, 1);
    }

    removeOldFile(id: number) {
        this.confirmationService.confirm({
            header: 'Are you sure?',
            message: 'Please confirm to proceed.',
            accept: () => {
                if (id > 0) {
                    this.isLoading = true;
                    this.service.deleteProductImage(id).subscribe((response) => {
                        if(response.success){
                            this.toast.success('Success!', response.message);
                            this.isLoading = false;
                            this.getProductImages();
                        }
                        else{
                            this.toast.error('Error!', response.message);
                            this.isLoading = false;
                        }
                    })
                }
            },
            reject: () => {
                this.toast.error('Rejected', 'You have rejected.');
            },
        });
    }

    onSubmit(productDetailsForm: any) {
        if (productDetailsForm.invalid) {
            Object.keys(productDetailsForm.controls).forEach((key) => {
                productDetailsForm.controls[key].markAsTouched();
            });
            return;
        }

        this.isLoading = true;
        const formData = new FormData();
        formData.append('ProductId', this._id ? this._id : 0);
        formData.append(
            'ProductName',
            productDetailsForm.form.value.productName
        );
        formData.append(
            'ProductDescription',
            productDetailsForm.form.value.productDescription
        );
        formData.append('Price', productDetailsForm.form.value.price);
        formData.append(
            'Discount',
            productDetailsForm.form.value.discount
                ? productDetailsForm.form.value.discount
                : 0
        );
        formData.append(
            'StockStatus',
            productDetailsForm.form.value.stockStatus
        );
        formData.append('SKU', productDetailsForm.form.value.sku);
        formData.append('Brand', productDetailsForm.form.value.brand);
        formData.append('Category', productDetailsForm.form.value.category);
        formData.append('CreatedBy', this.loginId ? this.loginId : '');

        this.service.saveProduct(formData).subscribe(
            (response) => {
                if (response.success) {
                    this.toast.success('Success!', response.message);
                    this._id = response.taid;
                    this.getProductDetails();
                    this.isLoading = false;
                } else {
                    this.toast.error('Error!', response.message);
                    this.isLoading = false;
                }
            },
            (error) => {
                this.toast.error(
                    'Error!',
                    'There is an error while add product!'
                );
                this.isLoading = false;
            }
        );
    }

    drop(event: CdkDragDrop<any[]>) {
        if (this.oldFiles === event.container.data) {
            moveItemInArray(
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        }

        const updatedOrder = event.container.data.map((item, index) => ({
            ImageId: item.id,
            ImageOrderNumber: index + 1,
        }));
        if (updatedOrder.length > 0) {
            this.isLoading = true;

            const formData = new FormData();
            formData.append('updatedOrder', JSON.stringify(updatedOrder));

            this.service.updateImageOrder(formData).subscribe(
                (response) => {
                    if (response.success) {
                        this.toast.success('Success!', response.message);
                        this.isLoading = false;
                    } else {
                        this.toast.error('Error!', response.message);
                        this.isLoading = false;
                    }
                },
                (error) => {
                    this.toast.error(
                        'Error!',
                        'There is an error while updating the image order!'
                    );
                    this.isLoading = false;
                }
            );
        }
    }
}
