import { Component } from '../../base/Component';
import { IEvents } from '../../base/events';
import { ensureElement } from '../../../utils/utils';
import { AppEvents, settings } from '../../../utils/constants';

interface ISuccess {
	total: number;
}

export class Success extends Component<ISuccess> {
	protected _button: HTMLButtonElement;
	protected _total: HTMLElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this._button = ensureElement<HTMLButtonElement>(settings.successCloseSelector, container);
		this._total = ensureElement<HTMLElement>(settings.successTotalSelector, container);

		this._button.addEventListener('click', () => {
			this.events.emit(AppEvents.SUCCESS_BUTTON_CLICK);
		});
	}

	set total(value: number) {
		this.setText(this._total,  `Списано ${value} синапсов`);
	}
}