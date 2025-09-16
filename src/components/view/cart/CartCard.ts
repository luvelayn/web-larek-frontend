import { Card } from '../common/Card';
import { IEvents } from '../../base/events';
import { ensureElement } from '../../../utils/utils';
import { AppEvents, settings } from '../../../utils/constants';
import { IItem } from '../../../types';

export type ICartCard = IItem & { index: number };

export class CartCard extends Card<ICartCard> {
	protected _index: HTMLElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events, {
			onClick: () =>
				this.events.emit(AppEvents.CART_CARD_REMOVE_BUTTON_CLICK, {
					id: this._id,
				}),
		});

		this._index = ensureElement<HTMLElement>(
			settings.cartCardIndexSelector,
			container
		);
	}

	set index(value: number) {
		this.setText(this._index, value);
	}
}
