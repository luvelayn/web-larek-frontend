import { Card, ICard } from '../common/Card';
import { ensureElement } from '../../../utils/utils';
import { AppEvents, settings } from '../../../utils/constants';
import { IEvents } from '../../base/events';
import { IItem } from '../../../types';

export type ICatalogCard = ICard & Pick<IItem, 'category' | 'image'>;

export class CatalogCard<T extends ICatalogCard> extends Card<T> {
	protected _category: HTMLElement;
	protected _image: HTMLImageElement;

	protected readonly _categoryMap: Map<string, string> = new Map([
		['софт-скил', settings.catalogCardCategory.softClass],
		['хард-скил', settings.catalogCardCategory.hardClass],
		['другое', settings.catalogCardCategory.otherClass],
		['дополнительное', settings.catalogCardCategory.additionalClass],
		['кнопка', settings.catalogCardCategory.buttonClass],
	]);

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this._category = ensureElement<HTMLElement>(settings.card.categorySelector, container);
		this._image = ensureElement<HTMLImageElement>(settings.card.imageSelector, container);

		if (this.container.nodeName === 'BUTTON') {
			this.container.addEventListener('click', () => {
				this.events.emit(AppEvents.CATALOG_CARD_CLICK,
					{ id: this._id }
				);
			});
		}
	}

	set category(value: string) {
		this.setText(this._category, value);
		this.toggleClass(this._category, this._categoryMap.get(value), true);
	}

	set image(value: string) {
		this.setImage(this._image, value);
	}
}
