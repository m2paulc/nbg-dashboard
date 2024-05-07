import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
	// const john = await prisma.customers.create({
	// 	data: {
	// 		customerLastName: "Doe",
	// 		customerFirstName: "John",
	// 		customerAddress: "123 Main St",
	// 		customerCity: "New York",
	// 		customerState: "NY",
	// 		customerZip: "10001",
	// 		customerPhone: "123-456-7890",
	// 		customerCell: "123-456-7890",
	// 		customerWorkPhone: "123-456-7890",
	// 		customerDriverLicense: "123456789A123456789",
	// 		customerDriverLicenseState: "NY",
	// 	},
	// });

	// const jane = await prisma.customers.create({
	// 	data: {
	// 		customerLastName: "Smith",
	// 		customerFirstName: "Jane",
	// 		customerAddress: "456 Elm St",
	// 		customerCity: "Othertown",
	// 		customerState: "NY",
	// 		customerZip: "90210",
	// 		customerPhone: "555-555-9011",
	// 		customerCell: "555-555-1111",
	// 		customerWorkPhone: "555-555-2222",
	// 		customerDriverLicense: "DEF789012",
	// 		customerDriverLicenseState: "NY",
	// 	},
	// });
	// console.log({ john, jane });

	// const johnCar = await prisma.cars.create({
	// 	data: {
	// 		customerIdentifierId: "clvvogxqs0000yujy5m4k9h4x",
	// 		carModel: "Camry",
	// 		carMake: "Toyota",
	// 		carYear: 2018,
	// 		carEngineSize: 2.5,
	// 		carVIN: "1G1ZT528345678901",
	// 		carOdometerIn: 50000,
	// 		carOdometerOut: 75000,
	// 		carLicensePlate: "ABC1234",
	// 		carTireSize: "225/60R17",
	// 	},
	// });
	// const janeCar = await prisma.cars.create({
	// 	data: {
	// 		customerIdentifierId: "clvvogxri0001yujyf1d38no0",
	// 		carModel: "Civic",
	// 		carMake: "Honda",
	// 		carYear: 2020,
	// 		carEngineSize: 1.8,
	// 		carVIN: "1HGBH41JXMN109876",
	// 		carOdometerIn: 10000,
	// 		carOdometerOut: 20000,
	// 		carLicensePlate: "DEF5678",
	// 		carTireSize: "205/55R16",
	// 	},
	// });
	// const partOrder = await prisma.partsOrderEntry.create({
	// 	data: {
	// 		saleDate: new Date(),
	// 		partStore: "Auto Parts",
	// 		skuNumber: "PA-01234567890",
	// 		description: "Oil Filter",
	// 		listPriceInCents: 10000,
	// 		costPriceInCents: 8000,
	// 		quantity: 1,
	// 		customerOrderId: "clvvogxqs0000yujy5m4k9h4x",
	// 		totalPriceInCents: 10000,
	// 	},
	// });
	const johnInvoice = await prisma.invoices.create({
		data: {
			invoiceDate: new Date(),
			customerIdenId: "clvvogxqs0000yujy5m4k9h4x",
			customerCarId: "clvwk59mv000112ntpvy49qy7",
			serviceRequest: "Oil Change and Tire Rotation",
			partsOrderId: "clvwncix10001707g7ntn2pw8",
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
	});
	console.log({ johnInvoice });
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
