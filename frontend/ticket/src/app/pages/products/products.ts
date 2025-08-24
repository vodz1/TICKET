import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../Services/products-service';
import { BehaviorSubject, catchError, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import {  Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-products',
  imports: [CardModule , ButtonModule , InputTextModule, FormsModule ,
     CurrencyPipe , SelectModule ],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
  selectedOption = signal<string>('name'); // default search by name
  products = signal<any[]>([]);
  searchItem = signal<string>('');
  private DestroyRef = inject(DestroyRef);
  private search$ = new BehaviorSubject<{ term: string; field: string }>({ term: '', field: 'name' });
    searchOptions = [
    { label: 'Name', value: 'name' },
    { label: 'Price', value: 'price' }
  ];
  constructor(private readonly productService : ProductsService , private readonly router : Router) {}

  ngOnInit(){
  const subscription =  this.search$.pipe(
        debounceTime(300),
        distinctUntilChanged((a, b) => a.term === b.term && a.field === b.field),
        switchMap(({ term, field }) => {
          const trimmed = term.trim();
          if (trimmed === '') {
            this.router.navigate([], { queryParams: { search: null, field : null }, queryParamsHandling: 'merge' });
            return this.productService.getProducts();
          } else {
            this.router.navigate([], { queryParams: { search: trimmed, field }, queryParamsHandling: 'merge' });
            return this.productService.searchProducts(field, trimmed); // 👈 pass field to backend
          }
        }),
        catchError(err => {
          console.error(err);
          return of({ products: [] });
        })
      )
      .subscribe((res: any) => {
        this.products.set(res.products);
      });

    // cleanup
    this.DestroyRef.onDestroy(() => subscription.unsubscribe());

    // load initial products
    this.search$.next({ term: '', field: this.selectedOption() });
  }

    onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchItem.set(input.value);
    this.search$.next({ term: this.searchItem(), field: this.selectedOption() });
  }

  // called when user switches between "name" and "price"
  onFieldChange() {
    this.searchItem.set(''); // clear search input
    this.search$.next({ term: this.searchItem(), field: this.selectedOption() });
  }
}