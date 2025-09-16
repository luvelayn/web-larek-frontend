import { Component } from '../../base/Component';
import { IEvents } from '../../base/events';
import { ensureElement } from '../../../utils/utils';
import { categoryMap, settings } from '../../../utils/constants';
import { IItem } from '../../../types';

interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export abstract class Card<T extends IItem> extends Component<T> {
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _description?: HTMLElement;
	protected _image?: HTMLImageElement;
	protected _category?: HTMLElement;
	protected _button?: HTMLButtonElement;
	protected _id: string;

	protected constructor(
		container: HTMLElement,
		events: IEvents,
		actions?: ICardActions
	) {
		super(container, events);

		this._title = ensureElement<HTMLElement>(
			settings.card.titleSelector,
			container
		);
		this._price = ensureElement<HTMLElement>(
			settings.card.priceSelector,
			container
		);

		this._description = container.querySelector(
			settings.card.descriptionSelector
		);
		this._image = container.querySelector(settings.card.imageSelector);
		this._category = container.querySelector(settings.card.categorySelector);
		this._button = container.querySelector(settings.card.buttonSelector);

		if (actions) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				this.container.addEventListener('click', actions.onClick);
			}
		}
	}

	set id(value: string) {
		this._id = value;
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set price(value: number | null) {
		const text = value ? `${value} синапсов` : 'Бесценно';
		this.setText(this._price, text);

		if (!value) {
			this.setDisabled(this._button, true);
		}
	}

	set category(value: string) {
		this.setText(this._category, value);
		this.toggleClass(this._category, categoryMap.get(value), true);
	}

	set image(value: string) {
		this.setImage(this._image, value);
	}

	set description(value: string) {
		this.setText(this._description, value);
	}
}
