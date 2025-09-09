import { ICustomer, IValidationErrors } from '../../types';
import { IEvents } from '../base/events';
import { AppEvents } from '../../utils/constants';

export class CustomerModel {
	protected customer: ICustomer = {
		payment: '',
		email: '',
		phone: '',
		address: ''
	};

	protected validationErrors: IValidationErrors = {};

	constructor(protected events: IEvents) {
	}

	setData<K extends keyof ICustomer>(key: K, value: ICustomer[K]) {
		this.customer[key] = value;

		this.events.emit(AppEvents.CUSTOMER_CHANGED, {
			key,
			value
		});
	}

	clearData() {
		this.customer = {
			payment: '',
			email: '',
			phone: '',
			address: ''
		};
	}

	clearValidation() {
		this.validationErrors = {};
	}

	getData(): ICustomer {
		return this.customer;
	}

	validate(fields?: (keyof ICustomer)[]) {
		const validators = {
			payment: () => !this.customer.payment ? 'Необходимо выбрать способ оплаты' : null,
			address: () => !this.customer.address ? 'Необходимо указать адрес' : null,
			email: () => !this.customer.email ? 'Необходимо указать email' : null,
			phone: () => !this.customer.phone ? 'Необходимо указать телефон' : null,
		};

		const fieldsToValidate = fields || (Object.keys(validators) as (keyof ICustomer)[]);
		const errors: typeof this.validationErrors = {};

		fieldsToValidate.forEach(field => {
			const errorMessage = validators[field]();
			if (errorMessage) {
				errors[field] = errorMessage;
			}
		});

		this.validationErrors = { ...this.validationErrors, ...errors };
		this.events.emit(AppEvents.CUSTOMER_VALIDATION_CHANGED, errors);
		return Object.keys(errors).length === 0;
	}
}
