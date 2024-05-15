import prisma from "@/db";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { formatCurrency, checkStatus, formatDatetoLocal } from "./utils";

const ITEMS_PER_PAGE = 10;

export async function fetchAllInvoices() {
	noStore();
	try {
		console.log("get all invoices");
		const invoices = await prisma.invoices.findMany({
			include: {
				customerIden: true,
				customerCar: true,
			},
		});
	} catch (error) {
		console.error(error);
		throw new Error("Failed to get invoices");
	}
	revalidatePath("/dashboard/invoices");
	redirect("/dashboard/invoices");
}

export async function fetchFilteredInvoices(query: string) {
	noStore();

	// const offset = (currentPage - 1) * ITEMS_PER_PAGE;
	// const startsWithLetter = /^[a-zA-Z]/.test(query);
	const startsWithNumber = /^\d/.test(query);

	let whereDate = {};
	let whereStatus = {};
	if (query) {
		if (startsWithNumber) {
			whereDate = { invoiceDate: { gte: new Date(query) } };
		}

		if (query === "pending" || query === "canceled" || query === "paid") {
			const statusQ = checkStatus(query);
			whereStatus = { status: { equals: statusQ } };
		}
	}

	try {
		const data = await prisma.invoices.findMany({
			where: {
				OR: [
					{ serviceRequest: { contains: query, mode: "insensitive" } },
					{ laborDescription: { contains: query, mode: "insensitive" } },
					whereDate,
					whereStatus,
					{
						customerIden: {
							customerLastName: { contains: query, mode: "insensitive" },
						},
					},
					{
						customerIden: {
							customerFirstName: { contains: query, mode: "insensitive" },
						},
					},
					{
						customerIden: {
							customerAddress: { contains: query, mode: "insensitive" },
						},
					},
					{
						customerIden: {
							customerDriverLicense: { contains: query, mode: "insensitive" },
						},
					},
					{
						customerCar: {
							carLicensePlate: { contains: query, mode: "insensitive" },
						},
					},
					{
						customerCar: { carMake: { contains: query, mode: "insensitive" } },
					},
					{
						customerCar: { carModel: { contains: query, mode: "insensitive" } },
					},
					{ customerCar: { carVIN: { contains: query, mode: "insensitive" } } },
				],
			},
			orderBy: { invoiceDate: "desc" },
			take: ITEMS_PER_PAGE,
			skip: 0,
			include: {
				customerIden: true,
				customerCar: true,
			},
		});
		const filteredInvoices = data.map((invoice) => ({
			id: invoice.invoiceId,
			invoiceNumber: invoice.invoiceNumber,
			name: `${invoice.customerIden.customerFirstName} ${invoice.customerIden.customerLastName}`,
			service: invoice.serviceRequest,
			laborDesc: invoice.laborDescription,
			date: formatDatetoLocal(invoice.invoiceDate),
			amount: formatCurrency(invoice.invoiceTotalInCents),
			status: invoice.status,
			vehicle: `${invoice.customerCar.carMake}-${invoice.customerCar.carModel}-${invoice.customerCar.carYear}`,
			vehicleLic: invoice.customerCar.carLicensePlate,
		}));
		// console.log(filteredInvoices);
		return filteredInvoices;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch filtered invoices.");
	}
}

export async function fetchLatestInvoices() {
	noStore();
	try {
		console.log("get latest invoices");
		const data = await prisma.invoices.findMany({
			include: {
				customerIden: true,
				customerCar: true,
				// partsOrder: true,
			},
			orderBy: {
				invoiceDate: "desc",
			},
		});
		const latestInvoices = data.map((invoice) => ({
			...invoice,
			amount: formatCurrency(invoice.invoiceTotalInCents),
		}));
		// console.log(latestInvoices);
		return latestInvoices;
	} catch (error) {
		console.error("Database Error: ", error);
		throw new Error("Failed to get latest invoices");
	}
}

export async function fetchCardData() {
	noStore();

	try {
		const invoiceCountPromise = await prisma.invoices.count();
		const customerCountPromise = await prisma.customers.count();
		const pendingInvoicesPromise = await prisma.invoices.aggregate({
			where: {
				status: "PENDING",
			},
			_sum: {
				invoiceTotalInCents: true,
			},
		});
		const collectedInvoicesPromise = await prisma.invoices.aggregate({
			where: {
				status: "PAID",
			},
			_sum: {
				invoiceTotalInCents: true,
			},
		});

		const data = await Promise.all([
			invoiceCountPromise,
			customerCountPromise,
			pendingInvoicesPromise,
			collectedInvoicesPromise,
		]);

		const numberOfInvoices = Number(data[0] ?? "0");
		const numberOfCustomers = Number(data[1] ?? "0");
		const totalPendingInvoices = formatCurrency(
			data[2]._sum.invoiceTotalInCents ?? 0
		);
		const totalPaidInvoices = formatCurrency(
			data[3]._sum.invoiceTotalInCents ?? 0
		);

		return {
			numberOfInvoices,
			numberOfCustomers,
			totalPendingInvoices,
			totalPaidInvoices,
		};
	} catch (error) {
		console.error("Database Error: ", error);
		throw new Error("Failed to get card data");
	}
}

export async function fetchInvoicesPages(query: string) {
	noStore();

	const statusQ = checkStatus(query);

	try {
		const count = await prisma.invoices.count({
			where: {
				OR: [
					{
						customerIden: {
							customerLastName: { contains: query, mode: "insensitive" },
						},
					},
					{
						customerIden: {
							customerFirstName: { contains: query, mode: "insensitive" },
						},
					},
					{
						customerIden: {
							customerAddress: { contains: query, mode: "insensitive" },
						},
					},
					{
						customerIden: {
							customerDriverLicense: { contains: query, mode: "insensitive" },
						},
					},
					// { status: { equals: statusQ } },
					// { invoiceDate: { gte: formattedDate } },
					{ laborDescription: { contains: query, mode: "insensitive" } },
					{
						customerCar: {
							carLicensePlate: { contains: query, mode: "insensitive" },
						},
					},
					{
						customerCar: { carMake: { contains: query, mode: "insensitive" } },
					},
					{
						customerCar: { carModel: { contains: query, mode: "insensitive" } },
					},
				],
			},
		});
		// console.log(count);
		const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
		return totalPages;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch total number of invoices.");
	}
}

export async function fetchCustomersWithCars() {
	noStore();

	try {
		const customers = await prisma.customers
			.findMany({
				orderBy: { customerLastName: "asc" },
				include: {
					Cars: true,
				},
			})
			.then((customers) =>
				customers.flatMap((customer) => ({
					id: customer.customerId,
					name: `${customer.customerLastName}, ${customer.customerFirstName}`,
					Cars: customer.Cars.map(
						(car) =>
							({
								carId: car.carId,
								carModel: car.carModel,
								carMake: car.carMake,
								carYear: car.carYear,
								carLicensePlate: car.carLicensePlate,
								customerIdentifierId: car.customerIdentifierId,
							} = car)
					),
				}))
			);

		// console.log(customers);
		return customers;
	} catch (error) {
		console.error("Database Error: ", error);
		throw new Error("Failed to fetch all customers.");
	}
}

export async function fetchVehicles() {
	noStore();

	try {
		const data = await prisma.cars.findMany({
			orderBy: { carMake: "asc" },
		});
		const vehicles = data.map((vehicle) => ({
			id: vehicle.carId,
			make: vehicle.carMake,
			model: vehicle.carModel,
			year: vehicle.carYear,
			plate: vehicle.carLicensePlate,
			customerId: vehicle.customerIdentifierId,
		}));
		return vehicles;
	} catch (error) {
		console.error("Database Error: ", error);
		throw new Error("Failed to fetch all vehicles.");
	}
}

export async function fetchInvoiceById(id: string) {
	noStore();

	try {
		const invoice = await prisma.invoices.findUnique({
			select: {
				invoiceId: true,
				invoiceDate: true,
				customerIdenId: true,
				invoiceNumber: true,
				serviceRequest: true,
				customerCarId: true,
				partsId: true,
				laborDescription: true,
				laborHours: true,
				invoiceTotalInCents: true,
				paymentType: true,
				status: true,
			},
			where: { invoiceId: id },
		});
		console.log(invoice);
		return invoice;
	} catch (error) {
		console.error("Database Error: ", error);
		throw new Error("Failed to fetch invoice by id.");
	}
}

export async function fetchCustomerById(id: string) {
	noStore();
	try {
		const customer = await prisma.customers.findUnique({
			select: {
				customerLastName: true,
				customerFirstName: true,
			},
			where: { customerId: id },
		});
		console.log(customer);
		return customer;
	} catch (error) {
		console.error("Database Error: ", error);
		throw new Error("Failed to fetch customer by id.");
	}
}

export async function fetchCustomerCarsById(id: string) {
	noStore();

	try {
		const vehicle = await prisma.cars.findUnique({
			select: {
				carMake: true,
				carModel: true,
				carYear: true,
				carLicensePlate: true,
				carVIN: true,
			},
			where: { carId: id },
		});
		console.log(vehicle);
		return vehicle;
	} catch (error) {
		console.error("Database Error: ", error);
		throw new Error("Failed to fetch customer cars by id.");
	}
}

export async function fetchPartsOrderById(id: string) {
	noStore();

	try {
		const partsOrder = await prisma.partsOrderEntry.findUnique({
			select: {
				partsOrderEntryId: true,
				partStore: true,
				skuNumber: true,
				description: true,
				quantity: true,
				listPriceInCents: true,
				costPriceInCents: true,
			},
			where: { partsOrderEntryId: id },
		});
		console.log("Parts: ", partsOrder);
		return partsOrder;
	} catch (error) {
		console.error("Database Error: ", error);
		throw new Error("Failed to fetch parts order by id.");
	}
}

export async function fetchPartsOrders() {
	noStore();

	try {
		const data = await prisma.partsOrderEntry.findMany({
			orderBy: { partsOrderEntryId: "asc" },
		});
		console.log(data);
		return data;
	} catch (error) {
		console.error("Database Error: ", error);
		throw new Error("Failed to fetch parts orders.");
	}
}

export async function updateInvoiceParts() {
	noStore();

	try {
		const updatedData = await prisma.invoices.update({
			where: {
				invoiceId: "45419208-596d-4eec-9e41-fd2d5dcda0f1",
			},
			data: {
				partsId: "clw758mam00014dotxhbzwmcy",
			},
		});
		console.log(updatedData);
	} catch (error) {
		console.error("Database Error: ", error);
		throw new Error("Failed to update invoice parts.");
	}
}
