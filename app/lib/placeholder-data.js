const customers = [
	{
		customerId: "cuid-1234567890abcdef",
		customerLastName: "Doe",
		customerFirstName: "John",
		customerAddress: "123 Main St",
		customerCity: "Anytown",
		customerState: "CA",
		customerZip: "12345",
		customerPhone: "555-555-1234",
		customerCell: "555-555-5678",
		customerWorkPhone: "555-555-9012",
		customerDriverLicense: "ABC123456",
		customerDriverLicenseState: "CA",
	},
	{
		customerId: "cuid-234567890abcdef1",
		customerLastName: "Smith",
		customerFirstName: "Jane",
		customerAddress: "456 Elm St",
		customerCity: "Othertown",
		customerState: "NY",
		customerZip: "90210",
		customerPhone: "555-555-9011",
		customerCell: "555-555-1111",
		customerWorkPhone: "555-555-2222",
		customerDriverLicense: "DEF789012",
		customerDriverLicenseState: "NY",
	},
];

const cars = [
	{
		carId: "cuid-34567890abcdef2",
		customerId: "cuid-1234567890abcdef",
		carModel: "Camry",
		carMake: "Toyota",
		carYear: 2018,
		carEngineSize: 2.5,
		carVIN: "1G1ZT528345678901",
		carOdometerIn: 50000,
		carOdometerOut: 75000,
		carLicensePlate: "ABC1234",
		carTireSize: "225/60R17",
	},
	{
		carId: "cuid-4567890abcdef34",
		customerId: "cuid-1234567890abcdef",
		carModel: "Civic",
		carMake: "Honda",
		carYear: 2020,
		carEngineSize: 1.8,
		carVIN: "1HGBH41JXMN109876",
		carOdometerIn: 10000,
		carOdometerOut: 20000,
		carLicensePlate: "DEF5678",
		carTireSize: "205/55R16",
	},
];

const invoices = [
	{
		invoiceId: "cuid-567890abcdef4567",
		invoiceDate: "2024-05-01T00:00:00.000Z",
		invoiceNumber: "INV-001",
		customerIdenId: "cuid-1234567890abcdef",
		customerCarId: "cuid-34567890abcdef2",
		serviceRequest: "Oil Change and Tire Rotation",
		partsOrderId: "PO-001",
		extededPriceinCents: 10000,
		commercialPriceInCents: 9000,
		differencePriceInCents: 1000,
		differenceTotalInCents: 1000,
		LaborHourlyRateInCents: 5000,
		LaborDescription: "Oil Change and Tire Rotation",
		LaborHours: 2,
		LaborTotalCostInCents: 10000,
		invoiceDiscountInCents: 0,
		taxInPercentage: 0.08,
		taxInCents: 800,
		subTotalInCents: 21000,
		invoiceTotalInCents: 22000,
		amountPaidInCents: 0,
		balanceDueInCents: 22000,
		paymentType: "CASH",
	},
];
