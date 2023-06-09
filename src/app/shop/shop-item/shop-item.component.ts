import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Candle } from 'src/app/shared/interfaces/candle';
import { CartItem } from 'src/app/shared/interfaces/cart-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./shop-item.component.less']
})
export class ShopItemComponent implements OnInit{
  public count = 1;

  constructor(private router: Router) {}

  ngOnInit(): void {
    
   
  }
  @Input()
  public candle : Candle | null = null;

  @Output()
  public clickAddCartItem = new EventEmitter<CartItem>();  

  public hideCandles(): void {  
    // if (this.candle) {
    //   this.clickAddCartItem.emit({
    //     "id": '', 
    //     "idCandle": this.candle.id, 
    //     "count": this.count,
    //     "wick": data.wick,
    //     "scent": data.scent,
    //     "packaging": data.packaging,
      
    //   });
    //   this.count = 1;
    // }
  } 

  public showCandle(): void {
    this.router.navigate(['shop/' + this.candle?.id]); 

  }
  
  public changeCount(count: number) {
      this.count = count;
  }
}
