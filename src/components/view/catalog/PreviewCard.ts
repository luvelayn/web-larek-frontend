import { CatalogCard, ICatalogCard } from './CatalogCard';
import { ensureElement } from '../../../utils/utils';
import { AppEvents, settings } from '../../../utils/constants';
import { IEvents } from '../../base/events';
import { IItem } from '../../../types';

export type IPreviewCard = ICatalogCard & Pick<IItem, 'description'> & { buttonText: string };

export class PreviewCard extends CatalogCard<IPreviewCard> {
	protected _description;
	protected _button;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this._description = ensureElement<HTMLElement>(settings.card.descriptionSelector, container);
		this._button = ensureElement<HTMLButtonElement>(settings.card.buttonSelector, container);

		this._button.addEventListener('click', () => {
			events.emit(AppEvents.PREVIEW_CARD_BUTTON_CLICK,
				{ buttonText: this._button.textContent,
					id: this._id }
			);
		});
	}

	set description(value: string) {
		this.setText(this._description, value);
	}

	set price(value: number | null) {
		super.price = value;

		if (!value) {
			this.setDisabled(this._button, true);
		}
	}

	set buttonText(value: string) {
		if (this._button.disabled) {
			this.setText(this._button, 'Недоступно');
		} else {
			this.setText(this._button, value);
		}
	}
}