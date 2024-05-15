import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/invoices/editForm";
import {
	fetchInvoiceById,
	fetchCustomerById,
	fetchCustomerCarsById,
} from "@/app/lib/data";

async function Page({ params }: { params: { id: string } }) {
	const id = params.id;
	const invoice = await fetchInvoiceById(id);
	const customer = await fetchCustomerById(invoice!.customerIdenId);
	const vehicle = await fetchCustomerCarsById(invoice!.customerCarId);
	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
					{ label: "Invoices", href: "/dashboard/invoices" },
					{
						label: "Edit Invoice",
						href: `/dashboard/invoices/${id}/edit`,
						active: true,
					},
				]}
			/>
			<Form invoice={invoice} customer={customer} vehicle={vehicle} />
		</main>
	);
}

export default Page;
