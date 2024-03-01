import { Component, OnInit, inject } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import { CartStore } from './cart.store';
import { LineItem } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  // NOTE: you are free to modify this component

  private router = inject(Router)
  private cartStore = inject(CartStore)

  itemCount!: number
  // itemCount!: Observable<number> 
  sub$!: Subscription


  ngOnInit(): void {
    console.log("should see number of items", this.cartStore.getNumberOfItems)
    // this.itemCount = this.cartStore.getNumberOfItems

    this.sub$ =this.cartStore.emitLength.subscribe({
      next: (result) => {
        this.itemCount = result;
        console.log("PROducts LIST RECEIVED>>>>>>", this.itemCount)
      },
      error: (err) => { console.log(err) },
      complete: () => { this.sub$.unsubscribe() }
    })
  }

  checkout(): void {
    this.router.navigate([ '/checkout' ])
  }
}
