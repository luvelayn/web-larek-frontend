import { IItem } from '../../types';
import { IEvents } from '../base/events';
import { AppEvents } from '../../utils/constants';

export class CatalogModel {
	protected items: IItem[];

	constructor(protected events: IEvents) {
	}

	setItems(items: IItem[]) {
		this.items = items;

		this.events.emit(AppEvents.CATALOG_ITEMS_CHANGED);
	}

	getItems(): IItem[] {
		return this.items;
	}

	getItem(id: string): IItem {
		return this.items.find(item => item.id === id);
	}
}