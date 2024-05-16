"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { Button } from "@/app/ui/button";
import {
	ClockIcon,
	CurrencyDollarIcon,
	UserCircleIcon,
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
import { updateInvoice } from "@/app/lib/actions";
import { useEffect, useState } from "react";
import clsx from "clsx";

interface PaymentTypeOption {
	option: string;
	icon: JSX.Element;
}

interface StatusType {
	option: string;
	icon: JSX.Element;
}

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

	const [paymentOptions, setPaymentOptions] = useState<PaymentTypeOption[]>([]);
	const [selectedPaymentOption, setSelectedPaymentOption] = useState("");
	const [statuses, setStatuses] = useState<StatusType[]>([]);
	const [selectedStatus, setSelectedStatus] = useState("");

	useEffect(() => {
		const options: PaymentTypeOption[] = [
			{ option: "CASH", icon: <CurrencyDollarIcon className="w-5 h-5" /> },
			{ option: "CHECK", icon: <CheckCircleIcon className="w-5 h-5" /> },
			{ option: "CREDIT_CARD", icon: <CreditCardIcon className="w-5 h-5" /> },
			{ option: "DEBIT_CARD", icon: <CreditCardIcon className="w-5 h-5" /> },
			{
				option: "COMPANY_ACCOUNT",
				icon: <UserCircleIcon className="w-5 h-5" />,
			},
		];
		setPaymentOptions(options);

		const statusOptions: StatusType[] = [
			{ option: "PENDING", icon: <ClockIcon className="w-5 h-5" /> },
			{ option: "PAID", icon: <CheckCircleIcon className="w-5 h-5" /> },
			{ option: "CANCELED", icon: <NoSymbolIcon className="w-5 h-5" /> },
		];
		setStatuses(statusOptions);
	}, []);

	useEffect(() => {
		paymentOptions.forEach((paymentOption) => {
			if (paymentOption.option === invoice.paymentType) {
				setSelectedPaymentOption(paymentOption.option);
			}
		});
	}, [invoice.paymentType, paymentOptions]);

	useEffect(() => {
		statuses.forEach((status) => {
			if (status.option === invoice.status) {
				setSelectedStatus(status.option);
			}
		});
	}, [statuses, invoice.status]);

	console.log(invoice.paymentType);
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
						<div className="md:w-2/12 mb-4">
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
						<div className="md:w-2/12 mb-4">
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
						<div className="md:w-3/12 mb-4">
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
						<div className="mb-4 md:w-1/12">
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
						<div className="md:w-1/12 mb-4">
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
							<div className="flex flex-col md:flex-row gap-4 rounded-md border border-gray-200 bg-white p-4 outline-2">
								{paymentOptions.map((paymentOption) => (
									<div key={paymentOption.option} className="flex items-center">
										<input
											id={paymentOption.option.toLowerCase()}
											title={paymentOption.option}
											name="paymentType"
											type="radio"
											defaultValue={paymentOption.option}
											checked={selectedPaymentOption === paymentOption.option}
											onChange={() =>
												setSelectedPaymentOption(paymentOption.option)
											}
											className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
										/>
										<label
											htmlFor={paymentOption.option.toLowerCase()}
											className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-400 px-3 py-1.5 text-xs font-medium text-black"
										>
											{paymentOption.icon}
											{paymentOption.option}
										</label>
									</div>
								))}
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
								{statuses.map((status) => (
									<div key={status.option} className="flex items-center">
										<input
											id={status.option.toLowerCase()}
											title={status.option}
											name="status"
											type="radio"
											defaultValue={status.option}
											checked={selectedStatus === status.option}
											onChange={() => setSelectedStatus(status.option)}
											className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
											aria-describedby="status-error"
										/>
										<label
											htmlFor={status.option.toLowerCase()}
											className={clsx(
												"ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white",
												{
													"bg-orange-500": status.option === "PENDING",
													"bg-green-500": status.option === "PAID",
													"bg-red-500": status.option === "CANCELED",
												}
											)}
										>
											{status.option} {status.icon}
										</label>
									</div>
								))}
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
