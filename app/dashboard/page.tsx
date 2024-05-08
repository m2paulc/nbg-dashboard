import { lusitana } from "@/app/ui/fonts";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { fetchLatestInvoices } from "@/app/lib/data";
import { LatestInvoicesType } from "@/app/lib/definitions";

async function Page() {
	const latestInvoices = (await fetchLatestInvoices()).map((invoice) => ({
		...invoice,
		partsOrder: invoice.partsOrder
			? { partsOrderId: invoice.partsOrder.partsOrderEntryId }
			: null,
	}));

	return (
		<main>
			<h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
				Dashboard
			</h1>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{/* <Card title="Collected" value={totalPaidInvoices} type="collected" /> */}
				{/* <Card title="Pending" value={totalPendingInvoices} type="pending" /> */}
				{/* <Card title="Total Invoices" value={numberOfInvoices} type="invoices" /> */}
				{/* <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
			</div>
			<div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
				<LatestInvoices latestInvoices={latestInvoices} />
			</div>
		</main>
	);
}

export default Page;
