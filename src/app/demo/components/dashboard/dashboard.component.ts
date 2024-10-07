import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { environment } from 'src/environments/environment';
import { CommonService } from '../../service/common.service';
import { ToastrMessageService } from '../../service/toastr.service';
import { CountData } from '../common/models/model';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
    items!: MenuItem[];
    products!: Product[];
    chartData: any;
    chartOptions: any;
    subscription!: Subscription;
    isLoading: boolean = false;
    userId: any;
    avatar: any | null;
    baseUrl: any = environment.avatarUrl;
    countData: CountData = {};
    constructor(
        private productService: ProductService,
        public layoutService: LayoutService,
        private service: CommonService,
        private toast: ToastrMessageService
    ) {
        this.getDashboardData();
        this.subscription = this.layoutService.configUpdate$
            .pipe(debounceTime(25))
            .subscribe((config) => {
                this.initChart();
            });
    }

    ngOnInit() {
        this.productService
            .getProductsSmall()
            .then((data) => (this.products = data));

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' },
        ];
    }

    getDashboardData() {
        this.service.getDashboardData().subscribe(
            (response: any) => {
                if (response.success && response.data) {
                    const data = response.data;
                    this.countData.Customers = data[0].customers;
                    this.countData.NewlyRegistered = data[0].newlyRegistered;
                    this.countData.SuperAdminCountOnJan = data[0].superAdminCountOnJan;
                    this.countData.SuperAdminCountOnFeb = data[0].superAdminCountOnFeb;
                    this.countData.SuperAdminCountOnMarch =
                        data[0].adminCountOnMarch;
                    this.countData.AdminCountOnApril =
                        data[0].adminCountOnApril;
                    this.countData.SuperAdminCountOnMay = data[0].superadminCountOnMay;
                    this.countData.SuperAdminCountOnJune = data[0].superAdminCountOnJune;
                    this.countData.SuperAdminCountOnJuly = data[0].superAdminCountOnJuly;
                    this.countData.SuperAdminCountOnAug = data[0].superAdminCountOnAug;
                    this.countData.SuperAdminCountOnSep = data[0].superAdminCountOnSep;
                    this.countData.SuperAdminCountOnOct = data[0].superAdminCountOnOct;
                    this.countData.SuperAdminCountOnNov = data[0].superAdminCountOnNov;
                    this.countData.SuperAdminCountOnDec = data[0].superAdminCountOnDec;

                    this.countData.AdminCountOnJan = data[0].adminCountOnJan;
                    this.countData.AdminCountOnFeb = data[0].adminCountOnFeb;
                    this.countData.AdminCountOnMarch =
                        data[0].adminCountOnMarch;
                    this.countData.AdminCountOnApril =
                        data[0].adminCountOnApril;
                    this.countData.AdminCountOnMay = data[0].adminCountOnMay;
                    this.countData.AdminCountOnJune = data[0].adminCountOnJune;
                    this.countData.AdminCountOnJuly = data[0].adminCountOnJuly;
                    this.countData.AdminCountOnAug = data[0].adminCountOnAug;
                    this.countData.AdminCountOnSep = data[0].adminCountOnSep;
                    this.countData.AdminCountOnOct = data[0].adminCountOnOct;
                    this.countData.AdminCountOnNov = data[0].adminCountOnNov;
                    this.countData.AdminCountOnDec = data[0].adminCountOnDec;

                    this.countData.UserCountOnJan = data[0].userCountOnJan;
                    this.countData.UserCountOnFeb = data[0].userCountOnFeb;
                    this.countData.UserCountOnMarch = data[0].userCountOnMarch;
                    this.countData.UserCountOnApril = data[0].userCountOnApril;
                    this.countData.UserCountOnMay = data[0].userCountOnMay;
                    this.countData.UserCountOnJune = data[0].userCountOnJune;
                    this.countData.UserCountOnJuly = data[0].userCountOnJuly;
                    this.countData.UserCountOnAug = data[0].userCountOnAug;
                    this.countData.UserCountOnSep = data[0].userCountOnSep;
                    this.countData.UserCountOnOct = data[0].userCountOnOct;
                    this.countData.UserCountOnNov = data[0].userCountOnNov;
                    this.countData.UserCountOnDec = data[0].userCountOnDec;

                    this.initChart();
                } else {
                    this.toast.error('Error', response.message);
                }
            },
            (error) => {
                this.toast.error('Error', error.message);
            }
        );
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary'
        );
        const surfaceBorder =
            documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: [
                'Jan',
                'Feb',
                'March',
                'April',
                'May',
                'June',
                'July',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
            ],
            datasets: [
                {
                    label: 'Super Admin Dataset',
                    data: [
                        this.countData.SuperAdminCountOnJan,
                        this.countData.SuperAdminCountOnFeb,
                        this.countData.SuperAdminCountOnMarch,
                        this.countData.SuperAdminCountOnApril,
                        this.countData.SuperAdminCountOnMay,
                        this.countData.SuperAdminCountOnJune,
                        this.countData.SuperAdminCountOnJuly,
                        this.countData.SuperAdminCountOnAug,
                        this.countData.SuperAdminCountOnSep,
                        this.countData.SuperAdminCountOnOct,
                        this.countData.SuperAdminCountOnNov,
                        this.countData.SuperAdminCountOnDec,
                    ],
                    fill: false,
                    backgroundColor:
                        documentStyle.getPropertyValue('--cyan-400'),
                    borderColor:
                        documentStyle.getPropertyValue('--cyan-400'),
                    tension: 0.4,
                },
                {
                    label: 'Admin Dataset',
                    data: [
                        this.countData.AdminCountOnJan,
                        this.countData.AdminCountOnFeb,
                        this.countData.AdminCountOnMarch,
                        this.countData.AdminCountOnApril,
                        this.countData.AdminCountOnMay,
                        this.countData.AdminCountOnJune,
                        this.countData.AdminCountOnJuly,
                        this.countData.AdminCountOnAug,
                        this.countData.AdminCountOnSep,
                        this.countData.AdminCountOnOct,
                        this.countData.AdminCountOnNov,
                        this.countData.AdminCountOnDec,
                    ],
                    fill: false,
                    backgroundColor:
                        documentStyle.getPropertyValue('--blue-300'),
                    borderColor: documentStyle.getPropertyValue('--blue-300'),
                    tension: 0.4,
                },
                {
                    label: 'User Dataset',
                    data: [
                        this.countData.UserCountOnJan,
                        this.countData.UserCountOnFeb,
                        this.countData.UserCountOnMarch,
                        this.countData.UserCountOnApril,
                        this.countData.UserCountOnMay,
                        this.countData.UserCountOnJune,
                        this.countData.UserCountOnJuly,
                        this.countData.UserCountOnAug,
                        this.countData.UserCountOnSep,
                        this.countData.UserCountOnOct,
                        this.countData.UserCountOnNov,
                        this.countData.UserCountOnDec,
                    ],
                    fill: false,
                    backgroundColor:
                        documentStyle.getPropertyValue('--pink-300'),
                    borderColor: documentStyle.getPropertyValue('--pink-300'),
                    tension: 0.4,
                },
            ],
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
            },
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
