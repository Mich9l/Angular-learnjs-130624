import {Component} from '@angular/core';
import {productsMock} from '../../../shared/products/products.mock';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    public left :string = "left";
    public right :string ="right";
    public buy :string = "buy";
    public star:string =  "star";
    public feedback :string ="feedback";

    readonly product = productsMock[0]; 
    
    public Active(starIndex:number):boolean{
        return this.product.rating >= starIndex;

    } 


    public BuyProd(event : Event) :void{
        event.stopPropagation();
    }

}
