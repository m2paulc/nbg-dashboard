import Form from "@/app/ui/invoices/createForm";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchCustomersWithCars } from "@/app/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Create Invoice",
};

async function Page() {
	const customers = await fetchCustomersWithCars();

	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
					{ label: "Invoices", href: "dashboard/invoices" },
					{
						label: "Create Invoice",
						href: "dashboard/invoices/create",
						active: true,
					},
				]}
			/>
			<Form customers={customers} />
		</main>
	);
}

export default Page;
