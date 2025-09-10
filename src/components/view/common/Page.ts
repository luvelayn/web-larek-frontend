import { Component } from '../../base/Component';
import { IEvents } from '../../base/events';
import { ensureElement } from '../../../utils/utils';
import { AppEvents, settings } from '../../../utils/constants';

interface IPage {
	counter: number;
	gallery: HTMLElement[];
	locked: boolean;
}

export class Page extends Component<IPage> {
	protected _gallery: HTMLElement;
	protected _counter: HTMLElement;
	protected _cart: HTMLButtonElement;
	protected _wrapper: HTMLElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this._gallery = ensureElement<HTMLElement>(
			settings.gallerySelector,
			container
		);
		this._counter = ensureElement<HTMLElement>(
			settings.cartCounterSelector,
			container
		);
		this._cart = ensureElement<HTMLButtonElement>(
			settings.cartIconSelector,
			container
		);
		this._wrapper = ensureElement<HTMLElement>(
			settings.wrapperSelector,
			container
		);

		this._cart.addEventListener('click', () => {
			this.events.emit(AppEvents.CART_ICON_CLICK);
		});
	}

	set counter(value: number) {
		this.setText(this._counter, value);
	}

	set gallery(items: HTMLElement[]) {
		this._gallery.replaceChildren(...items);
	}

	set locked(isLocked: boolean) {
		this.toggleClass(this._wrapper, settings.wrapperLockedClass, isLocked);
	}
}
