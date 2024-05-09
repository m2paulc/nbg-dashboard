import prisma from "@/db";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { formatCurrency } from "./utils";

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
