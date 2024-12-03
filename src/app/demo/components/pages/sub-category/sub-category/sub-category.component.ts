import { Component } from '@angular/core';
import { CommonService } from 'src/app/demo/service/common.service';
import { ToastrMessageService } from 'src/app/demo/service/toastr.service';
import { Categories, SubCategory } from '../../../common/models/model';
import { Table } from 'primeng/table';

@Component({
    selector: 'app-sub-category',
    templateUrl: './sub-category.component.html',
    styleUrl: './sub-category.component.scss',
})
export class SubCategoryComponent {
    isLoading = false;
    subCategoryDialog: boolean = false;
    cols: any[] = [];
    categories: Categories[] = [];
    subCategory: SubCategory[] = [];
    selectedSubCategories: SubCategory[] = [];
    subCategoryDetails: SubCategory = {
        subCategoryId: 0,
        categoryId: 0,
        subCategoryName: '',
        isActive: false,
        isDeleted: false,
    };
    submitted: boolean = false;
    subCategoryId: any = 0;

    constructor(
        private readonly service: CommonService,
        private readonly toast: ToastrMessageService
    ) {}

    ngOnInit(): void {
        this.cols = [{ field: 'subCategory', header: 'Sub category' }];
        this.getSubCategories();
    }

    getCategories() {
        this.service.getCategories().subscribe((response: any) => {
            if (response.success) {
                this.categories = response.data;
            }
        });
    }

    getSubCategories() {
        this.isLoading = true;
        setTimeout(() => {
            this.service.getSubCategories().subscribe(
                (response: any) => {
                    if (response.success) {
                        this.subCategory = response.data;
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

    editSubCategory(_id: any) {
        this.subCategoryDialog = true;
        if (_id != null && _id > 0) {
            this.getCategories();
            this.subCategoryId = _id;
            this.isLoading = true;
            this.service.getSubCategoryDetails(_id).subscribe(
                (response: any) => {
                    if (response.success) {
                        this.subCategoryDetails = response.data;
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
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    openNew() {
        this.getCategories();
        this.subCategoryDetails = {};
        this.submitted = false;
        this.subCategoryDialog = true;
    }

    hideDialog() {
        this.subCategoryDialog = false;
        this.submitted = false;
    }

    onSubmit(subCategoryDetailsForm: any) {
        if (subCategoryDetailsForm.invalid) {
            Object.keys(subCategoryDetailsForm.controls).forEach((key) => {
                subCategoryDetailsForm.controls[key].markAsTouched();
            });
            return;
        }
        this.isLoading = true;
        const formData = new FormData();
        formData.append(
            'SubCategoryId',
            this.subCategoryId ? this.subCategoryId : 0
        );
        formData.append(
            'categoryId',
            subCategoryDetailsForm.form.value.categoryId
        );
        formData.append(
            'SubCategoryName',
            subCategoryDetailsForm.form.value.subCategoryName
        );
        this.service.addUpdateSubCategory(formData).subscribe(
            (response) => {
                if (response.success) {
                    this.toast.success('Success!', response.message);
                    this.isLoading = false;
                    this.subCategoryDialog = false;
                    this.getSubCategories();
                    this.subCategoryId = 0;
                } else {
                    this.toast.error('Error!', response.message);
                    this.isLoading = false;
                }
            },
            (error) => {
                this.toast.error('Error!', error.message);
                this.isLoading = false;
            }
        );
    }

    onActiveDeactive(subCategory: any) {}
}
