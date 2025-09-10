import { Form } from '../common/Form';
import { IEvents } from '../../base/events';
import { ensureElement } from '../../../utils/utils';
import { settings } from '../../../utils/constants';
import { ICustomer } from '../../../types';

export type IOrderForm = Pick<ICustomer, 'payment' | 'address'>;

export class OrderForm extends Form<IOrderForm> {
	protected _cardButton: HTMLButtonElement;
	protected _cashButton: HTMLButtonElement;
	protected _address: HTMLInputElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._cardButton = ensureElement<HTMLButtonElement>(
			settings.orderPayment.cardSelector,
			container
		);
		this._cashButton = ensureElement<HTMLButtonElement>(
			settings.orderPayment.cashSelector,
			container
		);
		this._address = ensureElement<HTMLInputElement>(
			settings.orderAddressSelector,
			container
		);

		this._cardButton.addEventListener('click', this.handlePaymentClick);
		this._cashButton.addEventListener('click', this.handlePaymentClick);
	}

	protected handlePaymentClick = (e: MouseEvent) => {
		const target = e.target as HTMLInputElement;
		this.onFieldChange('payment', target.name);
	};

	set address(value: string) {
		this._address.value = value;
	}

	set payment(value: string) {
		const isCard = value === 'card';
		const isCash = value === 'cash';

		this.toggleClass(
			this._cardButton,
			settings.orderPayment.activeClass,
			isCard
		);
		this.toggleClass(
			this._cashButton,
			settings.orderPayment.activeClass,
			isCash
		);
	}
}
