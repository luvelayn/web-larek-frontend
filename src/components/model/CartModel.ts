import { IItem } from '../../types';
import { IEvents } from '../base/events';
import { AppEvents } from '../../utils/constants';

export class CartModel {
	protected items: IItem[] = [];

	constructor(protected events: IEvents) {
	}

	addItem(item: IItem) {
		this.items.push(item);

		this.events.emit(AppEvents.CART_ITEMS_CHANGED);
	}

	removeItem(id: string) {
		this.items = this.items.filter((item) =>
			item.id !== id
		);

		this.events.emit(AppEvents.CART_ITEMS_CHANGED);
	}

	clear() {
		this.items = [];

		this.events.emit(AppEvents.CART_ITEMS_CHANGED);
	}

	getItems(): IItem[] {
		return this.items;
	}

	getTotal(): number {
		return this.items.reduce((acc, curr) =>
			acc + curr.price, 0
		);
	}

	isInCart(id: string): boolean {
		return this.items.findIndex((item) =>
			item.id === id
		) !== -1;
	}
}