<<<<<<< HEAD
import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  layout: string = 'app';

  constructor(private router: Router) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Switch layout based on the URL
      this.layout = this.router.url.startsWith('/auth') ? 'auth' : 'app';
    });
  }

  ngOnInit(): void { }

  title = 'Shopease-Users';
  // Variable to track the visibility of the Back to Top button
  isVisible: boolean = false;

  // Listen for the window scroll event to track page scrolling
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isVisible = window.pageYOffset > 200; // Show button when user scrolls down 200px
  }

  // Scroll to the top of the page when the button is clicked
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
=======
import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
>>>>>>> ce0eaddeb013ee01f022291ea15c0f805bc7b1f5
}
