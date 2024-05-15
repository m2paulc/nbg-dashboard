// export type Invoice = {
// 	invoiceId: string;
// 	customerId: string;
// 	customerLastName: string;
// 	customerFirstName: string;
// 	serviceRequest: string;
// 	carId: string;
// 	date: string;
// 	amount: number;
// 	paymentType:
// 		| "CASH"
// 		| "CHECK"
// 		| "CREDIT_CARD"
// 		| "DEBIT_CARD"
// 		| "COMPANY_ACCOUNT";
// 	status: "PENDING" | "PAID" | "CANCELED";
// };

export type LatestInvoicesType = {
	invoiceNumber: string;
	invoiceDate: Date;
	invoiceTotalInCents: number;
	serviceRequest: string;
	amount: string;
	status: "PENDING" | "PAID" | "CANCELED";
	customerIdenId: string;
	customerIden: Customer;
	customerCarId: string;
	customerCar: Car;
};

export type InvoiceForm = {
	invoiceId: string;
	invoiceDate: Date;
	customerId: string;
	invoiceNumber: string;
	serviceRequest: string;
	customerCarId: string;
	partsId: string;
	laborDescription: string;
	laborHours: number;
	invoiceDiscountInCents?: number;
	paymentType:
		| "CASH"
		| "CHECK"
		| "CREDIT_CARD"
		| "DEBIT_CARD"
		| "COMPANY_ACCOUNT";
	status: "PENDING" | "PAID" | "CANCELED";
};

export type CustomerForm = {
	customerLastName: string;
	customerFirstName: string;
};

export type VehicleForm = {
	carMake: string;
	carModel: string;
	carYear: number;
	carLicensePlate: string;
	carVIN: string;
};

export type PartsOrderForm = {
	partStore: string;
	skuNumber: string;
	description: string;
	quantity: number;
	listPriceInCents: number;
};

export type Customer = {
	customerId: string;
	customerLastName: string;
	customerFirstName: string;
	customerAddress: string;
	customerCity: string;
	customerState: string;
	customerZip: string;
	customerPhone: string;
	customerCell: string;
	customerWorkPhone: string;
	customerDriverLicense: string;
	customerDriverLicenseState: string;
};

export interface CustomerWithCars {
	id: string;
	name: string;
	Cars: CarProp[];
}

export type Car = {
	carId: string;
	customerIdentifierId: string;
	carModel: string;
	carMake: string;
	carYear: number;
	carEngineSize: number;
	carVIN: string;
	carOdometerIn: number;
	carOdometerOut: number;
	carLicensePlate: string;
	carTireSize: string;
};
interface CarProp {
	carId: string;
	customerIdentifierId: string;
	carModel: string;
	carMake: string;
	carYear: number;
	carLicensePlate: string;
}
