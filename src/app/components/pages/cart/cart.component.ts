import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  constructor(private router: Router) {

  }
  proceedToCheckout() {
    this.router.navigate(['/pages/checkout']);
  }
}
