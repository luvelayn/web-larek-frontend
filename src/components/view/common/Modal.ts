import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/events";
import { AppEvents, settings } from '../../../utils/constants';

interface IModal {
	content: HTMLElement;
}

export class Modal extends Component<IModal> {
	protected _closeButton: HTMLButtonElement;
	protected _content: HTMLElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this._closeButton = ensureElement<HTMLButtonElement>(settings.modalCloseSelector, container);
		this._content = ensureElement<HTMLElement>(settings.modalContentSelector, container);

		this._closeButton.addEventListener('click', this.close.bind(this));
		this.container.addEventListener('click', this.close.bind(this));
		this._content.addEventListener('click', (e: MouseEvent) =>
			e.stopPropagation()
		);
	}

	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
	}

	open() {
		this.toggleClass(this.container, settings.modalActiveClass, true)
		this.events.emit(AppEvents.MODAL_OPEN);
	}

	close() {
		this.toggleClass(this.container, settings.modalActiveClass, false)
		this.content = null;
		this.events.emit(AppEvents.MODAL_CLOSE);
	}

	render(data: IModal): HTMLElement {
		super.render(data);
		this.open();
		return this.container;
	}
}