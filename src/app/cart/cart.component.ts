import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Candle } from 'src/app/shared/interfaces/candle';
import { CartItem } from 'src/app/shared/interfaces/cart-item';
import { CartService } from '../shared/services/cart.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CandlesService } from '../shared/services/candles.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./cart.component.less']
})
export class CartComponent implements OnInit {

  constructor(    
    public cartService: CartService, 
    public candlesService: CandlesService,
    private changeDetectorRef: ChangeDetectorRef,
    private auth: AuthService,
  ) {
    this.auth.currentUser.subscribe((currentUser) => {
      if (!currentUser) return;
      this.isAuth = currentUser.user.uid!==undefined;
  })
  } 

  public candles: Candle[] | null = null; 
  
  public cartItems: CartItem[] | null = null; 
  public summary: number = 0;
    
  public isAuth: boolean = false;


  private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  
  public get isLoading(): Observable<boolean>{
    return this._isLoading
  }
  
  


  async ngOnInit(): Promise<void> {
    this.candles = await this.candlesService.candles;

    this.cartService.cartItems.subscribe(
      async (cartItems) => {
        if (cartItems === null) return;
        this.cartItems = cartItems
        this.summary = await this.candlesService.calculateCartSum(cartItems);
        this._isLoading.next(false);
        
      }
      );
      this.changeDetectorRef.detectChanges();
  }

  public deleteItem(id: string) {
    if (!this.cartItems) return;
    this.cartService.deleteItem(id);
    this.candlesService.calculateCartSum(this.cartItems);
  }  
  
  public changeCount(cartItem: CartItem) {  
    this.cartService.updateCount(cartItem.id, cartItem.count);
  }

  public getCandle(cartItem: CartItem) {
    return this.candles?.find(candle => candle.id === cartItem.idCandle)
  }
 }
