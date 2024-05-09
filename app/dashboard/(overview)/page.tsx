import { lusitana } from "@/app/ui/fonts";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { fetchLatestInvoices } from "@/app/lib/data";

async function Page() {
	const latestInvoices = await fetchLatestInvoices();

	return (
		<main>
			<h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
				Dashboard
			</h1>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"></div>
			<div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
				<LatestInvoices latestInvoices={latestInvoices} />
			</div>
		</main>
	);
}

export default Page;
