import { Component, Input, OnInit, Output, inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LineItem} from '../models';
import { CartStore } from '../cart.store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent implements OnInit {

  // NOTE: you are free to modify this component

  private fb = inject(FormBuilder)

  @Input({ required: true })
  productId!: string

  @Input({ required: true })
  productName!: string

  @Input({ required: true })
  productPrice!: number

  form!: FormGroup

  cartStore = inject(CartStore)

  ngOnInit(): void {
    this.form = this.createForm()
  }

  addToCart() {
    const lineItem: LineItem = {
      prodId: this.productId,
      quantity: this.form.value['quantity'],
      name: this.productName,
      price: this.productPrice
    }
    this.form = this.createForm()

    console.log("lineitem adding is ", lineItem)
    
    this.cartStore.add(lineItem)
  }

  private createForm(): FormGroup {
    return this.fb.group({
      quantity: this.fb.control<number>(1, [ Validators.required, Validators.min(1) ])
    })
  }

}
