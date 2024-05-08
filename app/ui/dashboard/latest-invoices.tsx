import { ArrowPathIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { lusitana } from "@/app/ui/fonts";
import { LatestInvoicesType } from "@/app/lib/definitions";
import { formatDatetoLocal } from "@/app/lib/utils";
import InvoiceStatus from "@/app/ui/invoices/invStatus";

export default function LatestInvoices({
	latestInvoices,
}: {
	latestInvoices: LatestInvoicesType[];
}) {
	return (
		<div className="flex w-full flex-col md:col-span-full">
			<h2 className={`${lusitana.className} mb-4 text-lg md:text-xl`}>
				Latest Invoices
			</h2>
			<div className="flex grow flex-col justify-between rounded-lg bg-gray-50 p-4">
				<div className="bg-white px-4">
					{latestInvoices.map((invoice, index) => {
						return (
							<div
								key={invoice.invoiceNumber}
								className={clsx("flex flex-col justify-between py-4", {
									"border-t": index !== 0,
								})}
							>
								<div className="flex flex-row items-center justify-between">
									<div className="flex flex-row gap-4 justify-between">
										<p className="text-sm font-medium md:text-base">
											{formatDatetoLocal(invoice.invoiceDate)}
										</p>
										<p className="text-sm">{`INV#: ${invoice.invoiceNumber}`}</p>
										<p className="text-sm font-medium md:text-base">
											{`${invoice.customerIden.customerLastName}  ${invoice.customerIden.customerFirstName}`}
										</p>
									</div>
									<p
										className={`${lusitana.className} text-sm font-semibold md:text-base`}
									>
										{invoice.amount}
									</p>
									<InvoiceStatus status={invoice.status} />
								</div>
								<div className="flex flex-row items-center justify-between">
									<div className="flex flex-row gap-2 justify-between">
										<p>{`${invoice.customerCar.carMake} - `}</p>
										<p>{`${invoice.customerCar.carModel} - `}</p>
										<p>{invoice.customerCar.carYear}</p>
									</div>
									<div className="flex flex-row gap-1">
										<p className="text-sm">License Plate: </p>
										<p className="text-sm">
											{invoice.customerCar.carLicensePlate}
										</p>
									</div>
									<p className="text-sm font-medium md:text-base">
										{invoice.serviceRequest}
									</p>
								</div>
							</div>
						);
					})}
				</div>
				<div className="flex items-center pb-2 pt-6">
					<ArrowPathIcon className="h-5 w-5 text-gray-500" />
					<h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
				</div>
			</div>
		</div>
	);
}
