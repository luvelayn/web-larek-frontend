export interface IItem {
  id: string;
	description: string;
	image: string;
  title: string;
	category: string;
	price: number | null;
}

export interface ICustomer {
	payment: 'card' | 'cash' | '';
	email: string;
	phone: string;
	address: string;
}

export type IValidationErrors = Partial<Record<keyof ICustomer, string>>

export interface IOrder extends ICustomer {
	total: number;
	items: string[];
}

export interface IOrderResult {
	id: string;
	total: number;
}

