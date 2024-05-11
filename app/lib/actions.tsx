import prisma from "@/db";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
	id: z.string(),
	customerId: z.string({ invalid_type_error: "Please select a customer" }),
	amount: z.coerce
		.number()
		.gt(0, { message: "Please enter an amount greater than 0" }),
	status: z.enum(["CANCELED", "PENDING", "PAID"], {
		invalid_type_error: "Please select an invoice status",
	}),
	date: z.string(),
	serviceReq: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
	errors?: {
		customerId?: string[];
		amount?: string[];
		status?: string[];
	};
	message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
	noStore();

	const validateFields = CreateInvoice.safeParse({
		customerId: formData.get("customerId"),
		amount: formData.get("amount"),
		status: formData.get("status"),
	});

	if (!validateFields.success) {
		return {
			errors: validateFields.error.flatten().fieldErrors,
			message: "Failed to Create Invoice. Please fill out all required fields",
		};
	}

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
