import { Categories, Product } from './../../../common/models/model';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/demo/service/common.service';
import { ToastrMessageService } from 'src/app/demo/service/toastr.service';
import { Brands } from '../../../common/models/model';
import { forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';

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

    constructor(
        private readonly service: CommonService,
        private readonly toast: ToastrMessageService,
        private readonly router: Router,
        private readonly route: ActivatedRoute
    ) {
        this._id = this.route.snapshot.params['id'];
        if (this._id > 0 && this._id != null) {
            this.isEdit = true;
        }
    }

    ngOnInit(): void {
        this.getBrandsAndCategories();
        this.getProductDetails();
        this.getProductImages();

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
    }

    getProductDetails() {
        if (this._id != 0 && this._id != null) {
            this.isLoading = true;
            setTimeout(() => {
                this.service.getProductDetails(this._id).subscribe(
                    (response: any) => {
                        if (response.success) {
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

    getBrandsAndCategories() {
        forkJoin({
            brands: this.service.getBrands(),
            categories: this.service.getCategories(),
        }).subscribe(
            (responses: any) => {
                // Handle brands response
                if (responses.brands.success) {
                    this.brands = responses.brands.data;
                } else {
                    this.brands = [];
                }
                // Handle categories response
                if (responses.categories.success) {
                    this.categories = responses.categories.data;
                } else {
                    this.categories = [];
                }
            },
            (error: any) => {
                console.error('Error fetching brands or categories:', error);
            }
        );
    }

    // onUpload(event: UploadEvent) {
    //     for (let file of event.files) {
    //         this.uploadedFiles.push(file);
    //     }
    //     console.log(this.uploadedFiles);
    // }

    // onFileSelect(event: any): void {
    //     this.selectedFile = event.files[0];
    //     console.log('Selected file:', this.selectedFile);
    // }

    // onFileRemove(event: any): void {
    //     console.log('Removed file:', event.file);
    //     this.uploadedFiles = this.uploadedFiles.filter(
    //         (file) => file !== event.file
    //     );
    // }

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
                                const name = this.extractOriginalFileName(
                                    imgs[i].imageUrls
                                );

                                filesDetails.push({
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
                            this.getProductImages();
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

    removeOldFile(fileId: number, index: number) {
        console.log(`Deleting file with ID: ${fileId}`);
        this.oldFiles.splice(index, 1); // Remove from UI
    }
}
