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
				partsOrder: true,
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
					{ LaborDescription: { contains: query, mode: "insensitive" } },
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
			laborDesc: invoice.LaborDescription,
			date: formatDatetoLocal(invoice.invoiceDate),
			amount: formatCurrency(invoice.invoiceTotalInCents),
			status: invoice.status,
			vehicle: `${invoice.customerCar.carMake}-${invoice.customerCar.carModel}-${invoice.customerCar.carYear}`,
			vehicleLic: invoice.customerCar.carLicensePlate,
		}));
		console.log(filteredInvoices);
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

		console.log(
			numberOfInvoices,
			numberOfCustomers,
			totalPendingInvoices,
			totalPaidInvoices
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
					{ LaborDescription: { contains: query, mode: "insensitive" } },
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
