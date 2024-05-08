import prisma from "@/db";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
		const latestInvoices = await prisma.invoices.findMany({
			include: {
				customerIden: true,
				customerCar: true,
				partsOrder: true,
			},
			orderBy: {
				invoiceDate: "desc",
			},
		});
		return latestInvoices;
	} catch (error) {
		console.error("Database Error: ", error);
		throw new Error("Failed to get latest invoices");
	}
}
