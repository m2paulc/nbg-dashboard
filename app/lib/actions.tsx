"use server";

import prisma from "@/db";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
	id: z.string(),
	customerId: z.string({ invalid_type_error: "Please select a customer" }),
	carId: z.string({ invalid_type_error: "Please select a car" }),
	amount: z.coerce
		.number()
		.gt(0, { message: "Please enter an amount greater than 0" }),
	status: z.enum(["CANCELED", "PENDING", "PAID"], {
		invalid_type_error: "Please select an invoice status",
	}),
	date: z.string(),
	serviceReq: z.string(),
	paymentType: z.enum(
		["CASH", "CHECK", "CREDIT_CARD", "DEBIT_CARD", "COMPANY_ACCOUNT"],
		{ invalid_type_error: "Please select a payment type" }
	),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
	errors?: {
		customerId?: string[];
		carId?: string[];
		amount?: string[];
		status?: string[];
		paymentType?: string[];
		serviceReq?: string[];
	};
	message?: string | null;
};

export async function createInvoice(formData: FormData) {
	noStore();

	const { customerId, carId, amount, paymentType, status, serviceReq } =
		CreateInvoice.parse({
			customerId: formData.get("customerId"),
			carId: formData.get("carId"),
			amount: formData.get("amount"),
			paymentType: formData.get("paymentType"),
			status: formData.get("status"),
			serviceReq: formData.get("service"),
		});
	const amountInCents = amount * 100;

	const newInvoice = await prisma.invoices.create({
		data: {
			customerIdenId: customerId,
			customerCarId: carId,
			invoiceTotalInCents: amountInCents,
			paymentType,
			status,
			serviceRequest: serviceReq,
		},
	});

	// if (!validateFields.success) {
	// 	return {
	// 		errors: validateFields.error.flatten().fieldErrors,
	// 		message: "Failed to Create Invoice. Please fill out all required fields",
	// 	};
	// }

	// const rawFormData = {
	// 	customerId: formData.get("customerId"),
	// 	carId: formData.get("carId"),
	// 	amount: formData.get("amount"),
	// 	payment: formData.get("paymentType"),
	// 	status: formData.get("status"),
	// 	serviceReq: formData.get("service"),
	// };
	// Test it out:
	// console.log(rawFormData);

	revalidatePath("/dashboard/invoices");
	redirect("/dashboard/invoices");
}

export async function updateInvoice(
	id: string,
	prevState: State,
	formData: FormData
) {
	const validateFields = UpdateInvoice.safeParse({
		customerId: formData.get("customerId"),
		amount: formData.get("amount"),
		status: formData.get("status"),
		serviceReq: formData.get("serviceRequest"),
	});

	if (!validateFields.success) {
		return {
			errors: validateFields.error.flatten().fieldErrors,
			message: "Failed to Update Invoice. Please check all required fields",
		};
	}

	const { customerId, amount, status, serviceReq } = validateFields.data;
	const amountInCents = amount * 100;

	try {
		const updateInvoice = await prisma.invoices.update({
			where: { invoiceId: id },
			data: {
				serviceRequest: serviceReq,
			},
		});
	} catch (error) {
		return {
			message: "Database Error: Failed to update invoice.",
		};
	}

	revalidatePath("/dashboard/invoices");
	redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
	try {
	} catch (error) {
		return {
			message: "Database Error: Failed to delete invoice.",
		};
	}
}
