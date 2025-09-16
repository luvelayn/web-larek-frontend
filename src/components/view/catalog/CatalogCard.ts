import { Card } from '../common/Card';
import { AppEvents } from '../../../utils/constants';
import { IEvents } from '../../base/events';
import { IItem } from '../../../types';

export class CatalogCard extends Card<IItem> {
	constructor(container: HTMLElement, events: IEvents) {
		super(container, events, {
			onClick: () =>
				this.events.emit(AppEvents.CATALOG_CARD_CLICK, { id: this._id }),
		});
	}
}
