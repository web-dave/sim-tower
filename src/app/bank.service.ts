import { Injectable } from '@angular/core';
import { IBloxx } from 'models/bloxx.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  public readonly prizes: { [key: string]: number } = {
    unit: 3500,
    stairs: 500,
    flat: 1500,
    office: 1500,
    shopping: 2500,
    school: 1500,
    safety: 4500,
  };
  private balance = 350000;
  private bankAccount$$ = new BehaviorSubject<number>(this.balance);
  bankAccount$ = this.bankAccount$$.asObservable();

  isAbleToBuild(block: IBloxx): boolean {
    if (!this.prizes[block]) {
      return false;
    }
    return this.balance > this.prizes[block];
  }
  subtract(block: IBloxx) {
    if (this.prizes[block]) {
      const amount = this.prizes[block];
      this.balance -= amount;
      this.bankAccount$$.next(this.balance);
    }
  }

  add(amount: number) {
    this.balance += amount;
    this.bankAccount$$.next(this.balance);
  }
}
