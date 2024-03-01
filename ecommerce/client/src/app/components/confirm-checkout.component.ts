import { Component, OnInit, inject } from '@angular/core';
import { CartStore } from '../cart.store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Cart, LineItem, Order } from '../models';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrl: './confirm-checkout.component.css'
})
export class ConfirmCheckoutComponent implements OnInit {

  cartStore = inject(CartStore)
  length!: number
  private fb = inject(FormBuilder)
  form!: FormGroup
  items: LineItem[] = []
  total!: number
  prodSvc = inject(ProductService)
  newO!: Order

  // TODO Task 3
  ngOnInit(): void {
    this.length = this.cartStore.getLength()
    this.form = this.createForm()

    this.items = this.cartStore.getAllItems()
    console.log(" cart looks like that>>>>", this.items)
    this.getTotal()
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: this.fb.control<string>('', Validators.required),
      address: this.fb.control<number>(1, [Validators.required, Validators.minLength(3)]),
      priority: this.fb.control<boolean>(false),
      comments: this.fb.control<string>('')
    })
  }

  getTotal() {
    this.total = this.items.filter(p => p.price*p.quantity).reduce((sum, current) => sum + current.price*current.quantity, 0)
  }

  process() {
    const values = this.form.value
    console.log("Submitteed form", values)
    console.log("Submitteed name>>>", values['name'])

    const c: Cart = {
      "lineItems": this.items
    }

    this.newO = {
      "name": values['name'],
      "address": values['address'],
      "priority": values['priority'],
      "comments": values['comments'],
      "cart": c
    }

    console.log("BUILTTT>>", this.newO)

    this.prodSvc.checkout(this.newO).then(resp => {
      console.log('resp:', resp)
      alert('ALERRTTT! your order id: ' + resp.orderId)
    })
      .catch(resp => {
        alert(`ERROR: ${resp.error.message}`)
      })
  }

}
