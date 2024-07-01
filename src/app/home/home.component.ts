import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductComponent,
    CommonModule,
    PaginatorModule,
    EditPopupComponent,
    ButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  totalRecords: number = 0;
  rows: number = 5;

  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;
  selectedProduct: Product = {
    id: 0,
    image: '',
    name: '',
    price: '',
    rating: 0
  };

  constructor(private productService: ProductService) {}

  // Toggle edit popup
  toggleEditPopup(product: Product) {
    this.selectedProduct = product;
    this.displayEditPopup = true;
  }

  // Confirm edit action
  onConfirmEdit(product: Product) {
    if (!this.selectedProduct.id) {
      return;
    }
    this.editProducts(product, this.selectedProduct.id);
    this.displayEditPopup = false;
  }

  // Toggle add popup
  toggleAddPopup() {
    this.displayAddPopup = true;
  }

  // Confirm add action
  onConfirmAdd(product: Product) {
    this.addProducts(product);
    this.displayAddPopup = false;
  }

  // delete popup
  toggleDeletePopup(product: Product) {
    if(!product.id){
      return;
    }
    this.deleteProducts(product.id)
  }

  // Handle product output
  onProductOutput(product: Product) {
    console.log(product, "Output");
  }

  // Handle page change
  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  // Fetch products with pagination
  fetchProducts(page: number, perPage: number) {
    this.productService.getProducts('https://ang-17-backend.onrender.com/getItems', { page, perPage })
      .subscribe({
        next: (data: Products) => {
          this.products = data.items;
          this.totalRecords = data.total;
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  // Add a new product
  addProducts(product: Product) {
    this.productService.addProduct('https://ang-17-backend.onrender.com/addItem', product)
      .subscribe({
        next: (data: Product) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  // Edit an existing product
  editProducts(product: Product, id: number) {
    this.productService.editProduct(`https://ang-17-backend.onrender.com/editItem/${id}`, product)
      .subscribe({
        next: (data: Product) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  // Delete a product
  deleteProducts(id: number) {
    this.productService.deleteProduct(`https://ang-17-backend.onrender.com/delItem/${id}`)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  // Initialize component and fetch initial products
  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
}
