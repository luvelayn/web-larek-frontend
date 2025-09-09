import { Card, ICard } from '../common/Card';
import { IEvents } from '../../base/events';
import { ensureElement } from '../../../utils/utils';
import { AppEvents, settings } from '../../../utils/constants';

export type ICartCard = ICard & { index: number };

export class CartCard extends Card<ICartCard> {
	protected _index: HTMLElement;
	protected _removeButton: HTMLButtonElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this._index = ensureElement<HTMLElement>(settings.cartCardIndexSelector, container);
		this._removeButton = ensureElement<HTMLButtonElement>(settings.card.buttonSelector, container);

		this._removeButton.addEventListener('click', () => {
			this.events.emit(AppEvents.CART_CARD_REMOVE_BUTTON_CLICK,
				{	id: this._id	}
			);
		});
	}

	set index(value: number) {
		this.setText(this._index, value);
	}
}