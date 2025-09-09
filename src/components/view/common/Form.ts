import { Component } from '../../base/Component';
import { IEvents } from '../../base/events';
import { ensureElement } from '../../../utils/utils';
import { AppEvents, settings } from '../../../utils/constants';

export interface IForm {
	valid: boolean;
	errors: string[];
}

export abstract class Form<T> extends Component<IForm> {
	protected _errors: HTMLElement;
	protected _submitButton: HTMLButtonElement;

	protected constructor(protected container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._errors = ensureElement<HTMLElement>(settings.formErrorsSelector, container);
		this._submitButton = ensureElement<HTMLButtonElement>(settings.submitButtonSelector, container);

		this.container.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement;
			const field = target.name as keyof T;
			const value = target.value;
			this.onFieldChange(field, value);
		});

		this.container.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			this.events.emit(`${this.container.name}-${AppEvents.FORM_SUBMIT}`);
		});
	}

	protected onFieldChange(field: keyof T, value: string) {
		this.events.emit(AppEvents.FORM_FIELD_CHANGE, {
			field,
			value
		});
	}

	set valid(value: boolean) {
		this.setDisabled(this._submitButton, !value);
	}

	set errors(value: string[]) {
		this.setText(this._errors, value.join('; '));
	}

	render(data: Partial<T> & IForm) {
		const {valid, errors, ...fields} = data;
		super.render({valid, errors});
		Object.assign(this, fields);
		return this.container;
	}
}