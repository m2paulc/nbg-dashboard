export type Invoice = {
	invoiceId: string;
	customerId: string;
	customerLastName: string;
	customerFirstName: string;
	date: string;
	amount: number;
	status: "pending" | "paid" | "cancelled";
};
