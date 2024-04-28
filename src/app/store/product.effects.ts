import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, take, throttle } from "rxjs/operators";
import { setProduct } from "./product.actions";

@Injectable()
export class ProductEffects {

    // loadProducts$ = createEffect(() => 
    //     //         console.log('test')
    //     this.actions$.pipe(
    //         ofType('[Product] Set Product'), 
    //         take(1),
    //         mergeMap(() => {
    //             const productStateString = localStorage.getItem('products'); // Dobijanje stanja iz localStorage-a
    //             if(productStateString) {
    //                 console.log(productStateString)
    //                 const productState = JSON.parse(productStateString); // Parsiranje JSON-a u objekat
    //                 return of(setProduct({ product: productState.product })); // Kreiranje akcije za ažuriranje store-a
    //             } else {
    //                 // Ako nema podataka u localStorage-u, vraćamo prazan niz
    //                 return of(setProduct({ product: [] }));
    //             }
    //         }),
         
    //     )
    // );

    // constructor(private actions$: Actions){ }
}
