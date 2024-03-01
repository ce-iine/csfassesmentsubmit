import { ComponentStore } from "@ngrx/component-store";
import { Cart, LineItem } from "./models";
import { Observable, Subject } from "rxjs";

const INIT_STORE: Cart = {
    lineItems: []
}

// TODO Task 2
// Use the following class to implement your store
export class CartStore extends ComponentStore<Cart>{
    
    
    allItems: LineItem[]=[]
    emitLength = new Subject<number>()
    
    emitCart =new Subject<LineItem[]>()
    
    constructor() {
        super(INIT_STORE)

        let c = this.getAllItems()
        this.emitCart.next(c)
    }

    add(item: LineItem){
        this.allItems.push(item)
        console.log("YOUR CART LOOKS Like that now", this.allItems)
        this.emitLength.next(this.getLength())
    }

    getAllItems() {
        return this.allItems
      }
    
    getLength():number{
        return this.allItems.length
    }







    
    

    readonly addToCart = this.updater<LineItem>(
        (slice: Cart, diary: LineItem) => {
            const newSlice: Cart = {
                lineItems: [...slice.lineItems, diary,]
            };
            return newSlice;
        })

    readonly getAll = this.select<LineItem[]>(
        (slice: Cart) => slice.lineItems
      )

    readonly getNumberOfItems = this.select<number>(
        (slice: Cart) => slice.lineItems.length
    )

}
