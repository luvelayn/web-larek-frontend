import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { AppApi } from './components/services/AppApi';
import { API_URL, AppEvents, CDN_URL, settings } from './utils/constants';
import { CatalogModel } from './components/model/CatalogModel';
import { CustomerModel } from './components/model/CustomerModel';
import { CartModel } from './components/model/CartModel';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Page } from './components/view/common/Page';
import { Modal } from './components/view/common/Modal';
import { CatalogCard, ICatalogCard } from './components/view/catalog/CatalogCard';
import { IPreviewCard, PreviewCard } from './components/view/catalog/PreviewCard';
import { ICustomer, IItem, IOrder, IOrderResult, IValidationErrors } from './types';
import { Cart } from './components/view/cart/Cart';
import { CartCard, ICartCard } from './components/view/cart/CartCard';
import { OrderForm } from './components/view/order/OrderForm';
import { ContactsForm } from './components/view/order/ContactsForm';
import { Success } from './components/view/order/Success';

const events = new EventEmitter();
const api = new AppApi(CDN_URL, API_URL);

const catalogModel = new CatalogModel(events);
const customerModel = new CustomerModel(events);
const cartModel = new CartModel(events);

const successTemplate = ensureElement<HTMLTemplateElement>(settings.successTemplate);
const catalogCardTemplate = ensureElement<HTMLTemplateElement>(settings.catalogCardTemplate);
const previewCardTemplate = ensureElement<HTMLTemplateElement>(settings.previewCardTemplate);
const cartCardTemplate = ensureElement<HTMLTemplateElement>(settings.cartCardTemplate);
const cartTemplate = ensureElement<HTMLTemplateElement>(settings.cartTemplate);
const orderFormTemplate = ensureElement<HTMLTemplateElement>(settings.orderFormTemplate);
const contactsFormTemplate = ensureElement<HTMLTemplateElement>(settings.contactsFormTemplate);

const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>(settings.modalSelector), events);
const cart = new Cart(cloneTemplate(cartTemplate), events);
const orderForm = new OrderForm(cloneTemplate(orderFormTemplate), events);
const contactsForm = new ContactsForm(cloneTemplate(contactsFormTemplate), events);

const cardActions = {
	add: 'Купить',
	remove: 'Удалить из корзины',
}

const validationGroups: Record<keyof ICustomer, (keyof ICustomer)[]> = {
	payment: ['payment', 'address'],
	address: ['payment', 'address'],
	email: ['email', 'phone'],
	phone: ['email', 'phone']
};

events.on(AppEvents.CATALOG_ITEMS_CHANGED, () => {
	page.gallery = catalogModel.getItems().map((item) => {
		return new CatalogCard(cloneTemplate(catalogCardTemplate), events)
			.render(item);
	});

	page.counter = cartModel.getItems().length;
});

events.on(AppEvents.CATALOG_CARD_CLICK, (card: Pick<ICatalogCard, 'id'>) => {
	const buttonText = cartModel.isInCart(card.id)
		? cardActions.remove
		: cardActions.add;

	modal.render({
		content: new PreviewCard(cloneTemplate(previewCardTemplate), events)
			.render({
				...catalogModel.getItem(card.id),
				buttonText: buttonText,
			})
	});
});

events.on(AppEvents.PREVIEW_CARD_BUTTON_CLICK, (card: Pick<IPreviewCard, 'id' | 'buttonText'>)=> {
	if (card.buttonText === cardActions.add) {
		cartModel.addItem(catalogModel.getItem(card.id));
	} else if (card.buttonText === cardActions.remove) {
		cartModel.removeItem(card.id);
	}

	modal.close();
});

events.on(AppEvents.CART_ICON_CLICK, () => {
	modal.render({
		content: cart.render()
	});
});

events.on(AppEvents.CART_CARD_REMOVE_BUTTON_CLICK, (card: Pick<ICartCard, 'id'>) => {
	cartModel.removeItem(card.id);
});

events.on(AppEvents.CART_ITEMS_CHANGED, () => {
	page.counter = cartModel.getItems().length;

	const cartItems = cartModel.getItems().map((item, index) => {
		return new CartCard(cloneTemplate(cartCardTemplate), events)
			.render({
				...item,
				index: index + 1,
			});
	});

	cart.render({
		items: cartItems,
		total: cartModel.getTotal(),
	});
});

events.on(AppEvents.CART_ORDER_BUTTON_CLICK, () => {
	modal.render({
		content: orderForm.render({
			valid: false,
			errors: [],
			address: '',
			payment: '',
		})
	});
});

events.on(AppEvents.FORM_FIELD_CHANGE, (data: {field: keyof ICustomer; value: string}) => {
	customerModel.setData(data.field, data.value);
});

events.on(AppEvents.CUSTOMER_CHANGED, (data: {key: keyof ICustomer; value: string}) => {
	const { key, value } = data;

	if (key === 'payment') {
		orderForm.payment = value;
	}

	orderForm.valid = customerModel.validate(validationGroups[key]);
	contactsForm.valid = customerModel.validate(validationGroups[key]);
});

events.on(AppEvents.CUSTOMER_VALIDATION_CHANGED, (errors: IValidationErrors) => {
	const { payment, address, email, phone } = errors;

	orderForm.errors = Object.values({payment, address}).filter(i => !!i);
	contactsForm.errors = Object.values({email, phone}).filter(i => !!i);
});

events.on(AppEvents.ORDER_FORM_SUBMIT, () => {
	modal.render({
		content: contactsForm.render({
			valid: false,
			errors: [],
			email: '',
			phone: '',
		})
	});
});

events.on(AppEvents.CONTACTS_FORM_SUBMIT, () => {
	const order: IOrder = {
		...customerModel.getData(),
		total: cartModel.getTotal(),
		items: cartModel.getItems().map((item) => item.id),
	};

	api.orderItems(order)
		.then((result:  IOrderResult)=> {
			const success = new Success(cloneTemplate(successTemplate), events);

			modal.render({
				content: success.render({
					total: result.total,
				})
			});

			cartModel.clear();
			customerModel.clearData();
			customerModel.clearValidation();
		})
		.catch((err: Error) => {
			console.log(err);
		});
});

events.on(AppEvents.SUCCESS_BUTTON_CLICK, () => {
	modal.close();
});

events.on(AppEvents.MODAL_OPEN, () => {
	page.locked = true;
});

events.on(AppEvents.MODAL_CLOSE, () => {
	page.locked = false;
});

api.getItems()
	.then((items: IItem[]) => {
		catalogModel.setItems(items);
	})
	.catch((err: Error) => {
		console.error(err);
	});


