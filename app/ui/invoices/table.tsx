import InvoiceStatus from "./invStatus";
import { formatDatetoLocal, formatCurrency } from "@/app/lib/utils";
import { fetchFilteredInvoices } from "@/app/lib/data";

export default async function InvoicesTable({
	query,
	currentPage,
}: {
	query: string;
	currentPage: number;
}) {
	const invoices = await fetchFilteredInvoices(query);

	return (
		<div className="mt-6 flow-root">
			<div className="inline-block min-w-full align-middle">
				<div className="rounded-lg bg-gray-50 p-2 md:pt-0">
					<div className="md:hidden">
						{invoices?.map((invoice) => (
							<div
								key={invoice.invoiceNumber}
								className="flex flex-row items-center justify-between mb-2 w-full rounded-md bg-white p-4"
							>
								<div className="w-full border-b pb-4">
									<div className="flex justify-between pb-1">
										<p className="text-sm font-semibold">
											{invoice.invoiceNumber}
										</p>
										<p className="text-sm">{invoice.date}</p>
										<p className="text-sm">{invoice.name}</p>
									</div>
									<div>
										<div className="flex justify-between">
											<p className="text-sm">{invoice.service}</p>
											<p className="text-sm">{invoice.vehicle}</p>
											<p className="text-sm">{invoice.vehicleLic}</p>
											<p className="text-sm">{invoice.amount}</p>
										</div>
										<InvoiceStatus status={invoice.status} />
									</div>
									<div className="flex justify-end gap-2">
										{/* <UpdateInvoice id={invoice.id} />
                    <DeleteInvoice id={invoice.id} /> */}
									</div>
								</div>
							</div>
						))}
					</div>
					<table className="hidden w-full text-gray-900 md:table">
						<thead className="rounded-lg text-left text-sm font-normal">
							<tr>
								<th scope="col" className="px-3 py-4 font-medium">
									Invoice Number
								</th>
								<th scope="col" className="px-3 py-4 font-medium">
									Customer
								</th>
								<th scope="col" className="px-3 py-4 font-medium">
									Service
								</th>
								<th scope="col" className="px-3 py-4 font-medium">
									Car
								</th>
								<th scope="col" className="px-3 py-4 font-medium">
									Date
								</th>
								<th scope="col" className="px-3 py-4 font-medium">
									Amount
								</th>
								<th scope="col" className="px-3 py-4 font-medium">
									Status
								</th>
								<th scope="col" className="relative py-3 pl-3 pr-3">
									<span className="sr-only">Edit</span>
								</th>
							</tr>
						</thead>
						<tbody className="bg-white">
							{invoices?.map((invoice) => (
								<tr
									key={invoice.id}
									className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
								>
									<td className="whitespace-nowrap py-3 pr-3 pl-3">
										<p>{invoice.invoiceNumber}</p>
									</td>
									<td className="whitespace-nowrap py-3 pr-3">
										<p>{invoice.name}</p>
									</td>
									<td className="whitespace-nowrap py-3 pr-3">
										<p>{invoice.service}</p>
									</td>
									<td className="whitespace-nowrap py-3 pr-3">
										<p>{invoice.vehicle}</p>
									</td>
									<td className="whitespace-nowrap py-3 pr-3">
										<p>{invoice.date}</p>
									</td>
									<td className="whitespace-nowrap py-3 pr-3">
										<p>{invoice.amount}</p>
									</td>
									<td className="whitespace-nowrap py-3 pr-3">
										<InvoiceStatus status={invoice.status} />
									</td>
									<td className="whitespace-nowrap py-3 pl-6 pr-3">
										<div className="flex justify-end gap-3">
											{/* <UpdateInvoice id={invoice.id} />
											<DeleteInvoice id={invoice.id} /> */}
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
