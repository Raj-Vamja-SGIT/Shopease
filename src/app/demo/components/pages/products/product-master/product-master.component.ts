import { Categories, Product } from './../../../common/models/model';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/demo/service/common.service';
import { ToastrMessageService } from 'src/app/demo/service/toastr.service';
import { Brands } from '../../../common/models/model';
import { forkJoin } from 'rxjs';

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

    onUpload(event: UploadEvent) {
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }
        console.log(this.uploadedFiles);
        
    }

    onFileSelect(event: any): void {
        this.selectedFile = event.files[0];
        console.log('Selected file:', this.selectedFile);
    }

    onFileRemove(event: any): void {
        console.log('Removed file:', event.file);
        this.uploadedFiles = this.uploadedFiles.filter(
            (file) => file !== event.file
        );
    }

    showDialog() {
        this.visible = true;
    }
    
}
