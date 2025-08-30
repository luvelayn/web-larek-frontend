import { data } from 'autoprefixer';
import { render } from 'sass';

export interface IItem {
  id: string;
	description: string;
	image: string;
  title: string;
	category: string;
	price: number | null;
}

export type ICartItem = Pick<IItem, 'id' | 'title' | 'price'>

export interface ICustomer {
	payment: 'online' | 'offline' | '';
	email: string;
	phone: string;
	address: string;
}

export interface IOrder extends ICustomer {
	total: number;
	items: string[];
}

export interface IOrderResult {
	id: string;
	total: number;
}

export interface IAppApi {
	getItems(): Promise<IItem[]>;
	orderItems(order: IOrder): Promise<IOrderResult>;
}
