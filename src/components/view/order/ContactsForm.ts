import { Form } from '../common/Form';
import { IEvents } from '../../base/events';
import { ensureElement } from '../../../utils/utils';
import { settings } from '../../../utils/constants';
import { ICustomer } from '../../../types';

export type IContactsForm = Pick<ICustomer, 'email' | 'phone'>;

export class ContactsForm extends Form<IContactsForm> {
	protected _email: HTMLInputElement;
	protected _phone: HTMLInputElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._email = ensureElement<HTMLInputElement>(settings.contactsEmailSelector, container);
		this._phone = ensureElement<HTMLInputElement>(settings.contactsPhoneSelector, container);
	}

	set email(value: string) {
		this._email.value = value;
	}

	set phone(value: string) {
		this._phone.value = value;
	}
}