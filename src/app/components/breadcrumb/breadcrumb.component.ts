import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface Breadcrumb {
  label: string;
  url?: string;
  icon?: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() items: Breadcrumb[] = [];
  @Input() separator: string = '/';
  @Input() showHome: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.showHome && !this.items.some(item => item.url === '/')) {
      this.items.unshift({
        label: 'Home',
        url: '/'
      });
    }
  }

  navigate(url?: string): void {
    if (url) {
      this.router.navigate([url]);
    }
  }
}
