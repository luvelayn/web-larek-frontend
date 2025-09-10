import { Api, ApiListResponse } from '../base/api';
import { IItem, IOrder, IOrderResult } from '../../types';

export interface IAppApi {
	getItems(): Promise<IItem[]>;
	orderItems(order: IOrder): Promise<IOrderResult>;
}

export class AppApi extends Api implements IAppApi {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getItems(): Promise<IItem[]> {
		return this.get('/product').then((data: ApiListResponse<IItem>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	orderItems(order: IOrder): Promise<IOrderResult> {
		return this.post('/order', order).then((data: IOrderResult) => data);
	}
}
