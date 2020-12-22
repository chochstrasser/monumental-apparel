import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CartService } from '../services/cart.service';
import { CartProduct } from '../modals/cart';

@Component({
  selector: 'app-account-bag-table',
  templateUrl: './account-bag-table.component.html',
  styleUrls: ['./account-bag-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class AccountBagTableComponent implements AfterViewInit {
  dataSource: MatTableDataSource<CartProduct>;
  columnsToDisplay = ['name', 'quantity', 'price'];
  expandedElement: any;

  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort) sort: any;

  constructor(private cartService: CartService) {
    this.dataSource = new MatTableDataSource(cartService.getProducts());
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getTotalCost() {
    return this.cartService
      .getProducts()
      .map((t) => t.price)
      .reduce((acc, value) => (acc || 0) + (value || 0), 0);
  }

  get getTotalQuantity(): number {
    return this.cartService
      .getProducts()
      .map((t) => t.quantity)
      .reduce((acc, value) => (acc || 0) + (value || 0), 0);
  }
}
