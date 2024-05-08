export type Invoice = {
	invoiceId: string;
	customerId: string;
	customerLastName: string;
	customerFirstName: string;
	date: string;
	amount: number;
	status: "pending" | "paid" | "cancelled";
};

export type LatestInvoicesType = {
	invoiceNumber: string;
	invoiceDate: Date;
	invoiceTotalInCents: number;
	serviceRequest: string;
	amount: string;
	status: "PENDING" | "PAID" | "CANCELLED";
	customerIdenId: string;
	customerIden: {
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
	customerCarId: string;
	customerCar: {
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
};
