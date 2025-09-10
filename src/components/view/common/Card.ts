import { Component } from '../../base/Component';
import { IEvents } from '../../base/events';
import { ensureElement } from '../../../utils/utils';
import { settings } from '../../../utils/constants';
import { IItem } from '../../../types';

export type ICard = Pick<IItem, 'id' | 'title' | 'price'>;

export abstract class Card<T extends ICard> extends Component<T> {
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _id: string;

	protected constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this._title = ensureElement<HTMLElement>(
			settings.card.titleSelector,
			container
		);
		this._price = ensureElement<HTMLElement>(
			settings.card.priceSelector,
			container
		);
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set price(value: number | null) {
		const text = value ? `${value} синапсов` : 'Бесценно';
		this.setText(this._price, text);
	}

	set id(value: string) {
		this._id = value;
	}
}
