import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  @HostBinding('attr.ngSkipHydration') skipHydration = true;
}
