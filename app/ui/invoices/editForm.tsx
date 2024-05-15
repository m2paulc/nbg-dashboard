// "use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { Button } from "@/app/ui/button";
import {
	CheckIcon,
	ClockIcon,
	CurrencyDollarIcon,
	UserCircleIcon,
	MagnifyingGlassIcon,
	CameraIcon,
	CreditCardIcon,
	NoSymbolIcon,
	CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { CustomerForm, InvoiceForm, VehicleForm } from "@/app/lib/definitions";
import { formatDatetoLocalString } from "@/app/lib/utils";
import PartsOrder from "@/app/ui/parts";

export default function EditInvoiceForm({
	invoice,
	customer,
	vehicle,
}: {
	invoice: InvoiceForm;
	customer: CustomerForm;
	vehicle: VehicleForm;
}) {
	return (
		<main>
			<div className="rounded-md bg-gray-50 p-4 md:p-6">
				<div className="flex flex-col gap-2">
					<p className="font-medium">
						{formatDatetoLocalString(invoice.invoiceDate)}
					</p>
					<p className="text-sm">Invoice Number: {invoice.invoiceNumber}</p>
					<p>
						Customer:{" "}
						{`${customer.customerFirstName} ${customer.customerLastName}`}
					</p>
					<div className="w-6/12 flex flex-col md:flex-row md:justify-between text-sm gap-1">
						<p>
							Vehicle:{" "}
							{`${vehicle.carMake} ${vehicle.carModel} ${vehicle.carYear}`}{" "}
						</p>
						<p>License Plate: {vehicle.carLicensePlate}</p>
					</div>
					<p>VIN: {vehicle.carVIN}</p>
				</div>
				<form>
					{/* Service Request */}
					<div className="my-4">
						<label htmlFor="service" className="mb-2 block">
							Service Request
						</label>
						<textarea
							id="service"
							name="service"
							defaultValue={invoice.serviceRequest}
							rows={3}
							cols={100}
							className="w-full resize"
						/>
					</div>

					{/* Parts Order List */}
					<PartsOrder id={invoice.partsId} />
				</form>
			</div>
		</main>
	);
}
