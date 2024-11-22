import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { DataView } from 'primeng/dataview';
import { CommonService } from 'src/app/demo/service/common.service';
import { ToastrMessageService } from 'src/app/demo/service/toastr.service';
import { EncryptionService } from 'src/app/demo/service/encryption.service';
import { Router } from '@angular/router';
import { Product } from './../../../common/models/model';
import { Products } from 'src/app/demo/api/product';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss',
})
export class ProductsComponent {
    isLoading: boolean = true;
    products: Products[] = [];
    sortOptions: SelectItem[] = [];
    sortOrder: number = 0;
    sortField: string = '';
    userRole: any;
    ProductDetails: Product = {
        ProductId: '',
        ProductName: '',
        ProductDescription: '',
        Price: '',
        Discount: '',
        StockStatus: '',
        SKU: '',
        Category: 0,
        Brand: 0,
        Rating: 0,
        ImageUrls: '',
        ImageFiles: '',
    };

    constructor(
        private readonly service: CommonService,
        private readonly toast: ToastrMessageService,
        private readonly encryptionService: EncryptionService,
        private readonly router: Router
    ) {}

    ngOnInit(): void {
        this.userRole =
            this.encryptionService.getDecryptedData('authData')?.userRole;
        this.sortOptions = [
            { label: 'Price High to Low', value: '!price' },
            { label: 'Price Low to High', value: 'price' },
        ];
        this.getProducts();
    }

    getProducts() {
        this.isLoading = true;
        if (this.userRole && this.userRole != undefined) {
            setTimeout(() => {
                this.service.getProducts(this.userRole).subscribe(
                    (response: any) => {
                        if (response.success) {
                            this.products = response.data;
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
        } else {
            this.toast.error('Error', 'No product found!');
            this.isLoading = false;
        }
    }

    onSortChange(event: any) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }

    onCreateNew() {
        this.router.navigateByUrl('shopease/pages/products/master');
    }

    onProductClick(Id: any) {
        this.router.navigate([`shopease/pages/products/master/${Id}`]);
    }
}
