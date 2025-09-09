import { ICustomer } from '../types';

export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const cardActions = {
	add: 'Купить',
	remove: 'Удалить из корзины',
};

export const validationGroups: Record<keyof ICustomer, (keyof ICustomer)[]> = {
	payment: ['payment', 'address'],
	address: ['payment', 'address'],
	email: ['email', 'phone'],
	phone: ['email', 'phone']
};

export const AppEvents = {
	// Model Events
	CATALOG_ITEMS_CHANGED: 'catalog:items:changed',
	CART_ITEMS_CHANGED: 'cart:items:changed',
	CUSTOMER_CHANGED: 'customer:changed',
	CUSTOMER_VALIDATION_CHANGED: 'customer:validation:changed',

	// Page Events
	CART_ICON_CLICK: 'cart-icon:click',

	// Modal Events
	MODAL_OPEN: 'modal:open',
	MODAL_CLOSE: 'modal:close',

	// CatalogCard Events
	CATALOG_CARD_CLICK: 'catalog-card:click',

	// PreviewCard Events
	PREVIEW_CARD_BUTTON_CLICK: 'preview-card:button:click',

	// CartCard Events
	CART_CARD_REMOVE_BUTTON_CLICK: 'cart-card:remove-button:click',

	// Form Events
	FORM_FIELD_CHANGE: 'form:field:change',
	FORM_SUBMIT: 'form:submit',
	ORDER_FORM_SUBMIT: 'order-form:submit',
	CONTACTS_FORM_SUBMIT: 'contacts-form:submit',

	// Cart Events
	CART_ORDER_BUTTON_CLICK: 'cart:order-button:click',

	// Success Events
	SUCCESS_BUTTON_CLICK: 'success:button:click'
};

export const settings = {
	// Page
	gallerySelector: '.gallery',
	cartIconSelector: '.header__basket',
	cartCounterSelector: '.header__basket-counter',
	wrapperSelector: '.page__wrapper',
	wrapperLockedClass: 'page__wrapper_locked',

	// Modal
	modalSelector: '#modal-container',
	modalCloseSelector:  '.modal__close',
	modalContentSelector: '.modal__content',
	modalActiveClass: 'modal_active',

	// Success
	successTemplate: '#success',
	successCloseSelector: '.order-success__close',
	successTotalSelector: '.order-success__description',

	// Card
	card: {
		titleSelector: '.card__title',
		priceSelector: '.card__price',
		imageSelector: '.card__image',
		categorySelector: '.card__category',
		descriptionSelector: '.card__text',
		buttonSelector: '.card__button',
	},

	catalogCardTemplate: '#card-catalog',
	catalogCardCategory: {
		softClass: 'card__category_soft',
		hardClass: 'card__category_hard',
		otherClass: 'card__category_other',
		additionalClass: 'card__category_additional',
		buttonClass: 'card__category_button',
	},

	previewCardTemplate: '#card-preview',

	cartCardTemplate: '#card-basket',
	cartCardIndexSelector: '.basket__item-index',

	// Cart
	cartTemplate: '#basket',
	cartListSelector: '.basket__list',
	cartButtonSelector: '.basket__button',
	cartPriceSelector: '.basket__price',

	// Form
	formErrorsSelector: '.form__errors',
	formInputSelector: '.form__input',
	submitButtonSelector: 'button[type="submit"]',

	// OrderForm
	orderFormTemplate: '#order',
	orderPayment: {
		cardSelector: 'button[name="card"]',
		cashSelector: 'button[name="cash"]',
		activeClass: 'button_alt-active',
	},
	orderAddressSelector: 'input[name="address"]',

	// ContactsForm
	contactsFormTemplate: '#contacts',
	contactsEmailSelector: 'input[name="email"]',
	contactsPhoneSelector: 'input[name="phone"]',
};
