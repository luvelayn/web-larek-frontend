import { Component } from '../../base/Component';
import { IEvents } from '../../base/events';
import { createElement, ensureElement } from '../../../utils/utils';
import { AppEvents, settings } from '../../../utils/constants';

interface ICart {
	items: HTMLElement[];
	total: number;
}

export class Cart extends Component<ICart> {
	protected _list: HTMLElement;
	protected _orderButton: HTMLButtonElement;
	protected _total: HTMLElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this._list = ensureElement<HTMLElement>(settings.cartListSelector, container);
		this._orderButton = ensureElement<HTMLButtonElement>(settings.cartButtonSelector, container);
		this._total = ensureElement<HTMLElement>(settings.cartPriceSelector, container);

		this._orderButton.addEventListener('click', () => {
			this.events.emit(AppEvents.CART_ORDER_BUTTON_CLICK);
		});

		this.items = [];
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
			this.setDisabled(this._orderButton, false);
		} else {
			this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
				textContent: 'Корзина пуста'
			}));
			this.setDisabled(this._orderButton, true);
		}
	}

	set total(value: number) {
		this.setText(this._total, `${value} синапсов`);
	}
}