import { AppEvents } from '../../../utils/constants';
import { IEvents } from '../../base/events';
import { IItem } from '../../../types';
import { Card } from '../common/Card';

export type IPreviewCard = IItem & { buttonText: string };

export class PreviewCard extends Card<IPreviewCard> {
	constructor(container: HTMLElement, events: IEvents) {
		super(container, events, {
			onClick: () =>
				events.emit(AppEvents.PREVIEW_CARD_BUTTON_CLICK, {
					buttonText: this._button.textContent,
					id: this._id,
				}),
		});
	}

	set buttonText(value: string) {
		if (this._button.disabled) {
			this.setText(this._button, 'Недоступно');
		} else {
			this.setText(this._button, value);
		}
	}
}
