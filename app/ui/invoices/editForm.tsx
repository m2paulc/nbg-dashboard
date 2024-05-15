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
import {
	CustomerForm,
	InvoiceForm,
	PartsOrderForm,
	VehicleForm,
} from "@/app/lib/definitions";
import { formatCurrency, formatDatetoLocalString } from "@/app/lib/utils";
import PartsOrder from "@/app/ui/parts";
import { updateInvoice } from "@/app/lib/actions";

export default function EditInvoiceForm({
	invoice,
	customer,
	vehicle,
	partsOrder,
}: {
	invoice: InvoiceForm;
	customer: CustomerForm;
	vehicle: VehicleForm;
	partsOrder: PartsOrderForm;
}) {
	const updateInvoiceWithId = updateInvoice.bind(null, invoice.invoiceId);
	const formattedPrice = formatCurrency(Number(partsOrder.listPriceInCents));

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
				<form action={updateInvoiceWithId}>
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

					{/* Parts Order Table*/}
					<div className="flex flex-col gap-4 w-full md:flex-row md:gap-8">
						<div className="w-2/12 mb-4">
							<label
								htmlFor="partStore"
								className="mb-2 block text-sm font-medium"
							>
								Part Store
							</label>
							<input
								id="partStore"
								type="text"
								placeholder="Enter Store"
								defaultValue={partsOrder.partStore || ""}
								className="w-full block cursor-pointer rounded-md border border-gray-200 py-2 px-2 text-sm outline-2 placeholder:text-gray-500"
							/>
						</div>
						<div className="w-2/12 mb-4">
							<label
								htmlFor="partNumber"
								className="mb-2 block text-sm font-medium"
							>
								Part Number
							</label>
							<input
								id="partNumber"
								type="text"
								placeholder="Enter part number"
								defaultValue={partsOrder.skuNumber || ""}
								className="w-full block cursor-pointer rounded-md border border-gray-200 py-2 px-2 text-sm outline-2 placeholder:text-gray-500"
							/>
						</div>
						<div className="w-3/12 mb-4">
							<label
								htmlFor="partDescription"
								className="mb-2 block text-sm font-medium"
							>
								Part Description
							</label>
							<input
								id="partDescription"
								type="text"
								placeholder="Enter description"
								defaultValue={partsOrder.description || ""}
								className="w-full block cursor-pointer rounded-md border border-gray-200 py-2 px-2 text-sm outline-2 placeholder:text-gray-500"
							/>
						</div>
						<div className="mb-4 w-1/12">
							<label
								htmlFor="partQuantity"
								className="mb-2 block text-sm font-medium"
							>
								Quantity
							</label>
							<input
								id="partQuantity"
								type="number"
								placeholder="Enter quantity"
								defaultValue={partsOrder.quantity || ""}
								className="w-full block cursor-pointer rounded-md border border-gray-200 py-2 px-2 text-sm outline-2 placeholder:text-gray-500"
							/>
						</div>
						<div className="w-1/12 mb-4">
							<label
								htmlFor="partListPrice"
								className="mb-2 block text-sm font-medium"
							>
								Price
							</label>
							<input
								id="partListPrice"
								type="text"
								placeholder="Enter List Price"
								value={formattedPrice || ""}
								className="w-full block cursor-pointer rounded-md border border-gray-200 py-2 px-2 text-sm outline-2 placeholder:text-gray-500"
							/>
						</div>
					</div>

					{/* Invoice Payment Type */}
					<div className="mb-4">
						<fieldset>
							<legend className="mb-2 block text-sm font-medium">
								Choose Payment Type
							</legend>
							<div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
								<div className="flex gap-4">
									<div className="flex items-center">
										<input
											id="cash"
											name="paymentType"
											type="radio"
											value="CASH"
											className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
										/>
										<label
											htmlFor="cash"
											className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-400 px-3 py-1.5 text-xs font-medium text-black"
										>
											<CurrencyDollarIcon className="h-4 w-4" />
											Cash
										</label>
									</div>
									<div className="flex items-center">
										<input
											id="credit"
											name="paymentType"
											type="radio"
											value="CREDIT_CARD"
											className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
										/>
										<label
											htmlFor="credit"
											className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-400 px-3 py-1.5 text-xs font-medium text-black"
										>
											<CreditCardIcon className="h-4 w-4" />
											Credit Card
										</label>
									</div>
									<div className="flex items-center">
										<input
											id="check"
											name="paymentType"
											type="radio"
											value="CHECK"
											className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
										/>
										<label
											htmlFor="check"
											className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-400 px-3 py-1.5 text-xs font-medium text-black"
										>
											<CheckCircleIcon className="h-4 w-4" />
											Check
										</label>
									</div>
									<div className="flex items-center">
										<input
											id="debit"
											name="paymentType"
											type="radio"
											value="DEBIT_CARD"
											className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
										/>
										<label
											htmlFor="debit"
											className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-400 px-3 py-1.5 text-xs font-medium text-black"
										>
											<CreditCardIcon className="h-4 w-4" />
											Debit Card
										</label>
									</div>
									<div className="flex items-center">
										<input
											id="company"
											name="paymentType"
											type="radio"
											value="COMPANY_ACCOUNT"
											className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
										/>
										<label
											htmlFor="company"
											className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-400 px-3 py-1.5 text-xs font-medium text-black"
										>
											<UserCircleIcon className="h-4 w-4" />
											Company Account
										</label>
									</div>
								</div>
							</div>
						</fieldset>
					</div>

					{/* Invoice Status */}
					<fieldset>
						<legend className="mb-2 block text-sm font-medium">
							Set the invoice status
						</legend>
						<div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
							<div className="flex gap-4">
								<div className="flex items-center">
									<input
										id="pending"
										name="status"
										type="radio"
										value="PENDING"
										defaultChecked
										className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
										aria-describedby="status-error"
									/>
									<label
										htmlFor="pending"
										className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-orange-400 px-3 py-1.5 text-xs font-medium text-white"
									>
										Pending <ClockIcon className="h-4 w-4" />
									</label>
								</div>
								<div className="flex items-center">
									<input
										id="paid"
										name="status"
										type="radio"
										value="PAID"
										className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
										aria-describedby="status-error"
									/>
									<label
										htmlFor="paid"
										className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
									>
										Paid <CheckIcon className="h-4 w-4" />
									</label>
								</div>
								<div className="flex items-center">
									<input
										id="canceled"
										name="status"
										type="radio"
										value="CANCELED"
										className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
										aria-describedby="status-error"
									/>
									<label
										htmlFor="canceled"
										className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white"
									>
										Canceled <NoSymbolIcon className="h-4 w-4" />
									</label>
								</div>
							</div>
						</div>
						{/* <div id="status-error" aria-live="polite" aria-atomic="true">
						{state.errors?.status &&
							state.errors.status.map((error: string) => (
								<p className="mt-2 text-sm text-red-500" key={error}>
									{error}
								</p>
							))}
					</div> */}
					</fieldset>

					{/* <PartsOrder id={invoice.partsId} /> */}
					<div className="mt-6 flex justify-end gap-4">
						<Link
							href="/dashboard/invoices"
							className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
						>
							Cancel
						</Link>
						<Button type="submit">Update</Button>
					</div>
				</form>
			</div>
		</main>
	);
}
