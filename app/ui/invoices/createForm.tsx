"use client";

import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { CustomerWithCars } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFormState } from "react-dom";
import { createInvoice } from "@/app/lib/actions";
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

export default function Form({ customers }: { customers: CustomerWithCars[] }) {
	const initialState = { message: null, errors: {} };
	// const { state, dispatch } = useFormState(createInvoice, initialState);
	const [searchTerm, setSearchTerm] = useState("");
	const [openSelect, setOpenSelect] = useState(false);
	const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
	const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
	const router = useRouter();

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		const searchTerm = e.target.value;
		setSearchTerm(searchTerm);
		if (searchTerm.length > 0) {
			setOpenSelect(true);
		}
	};

	const handleCustomerChange = (customerId: string) => {
		const customer = customers.find((cust) => cust.id === customerId);
		setSelectedCustomer(customer?.id || null);
		router.push(`?[${customerId}]`, undefined);
	};

	const handleVehicleChange = (vehicleId: string) => {
		setSelectedVehicle(vehicleId);
	};

	return (
		<form action={createInvoice}>
			<div className="rounded-md bg-gray-50 p-4 md:p-6">
				<div className="mb-4">
					{/* Customer */}
					<label htmlFor="customer" className="mb-2 block text-sm font-medium">
						Choose customer
					</label>
					<div className="relative">
						<input
							type="text"
							value={searchTerm}
							onChange={handleSearch}
							placeholder="Search customer by name"
							className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
						/>
						<MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-6 text-gray-500" />
						<select
							id="customer"
							name="customerId"
							defaultValue=""
							onChange={(e) => handleCustomerChange(e.target.value)}
							className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
							aria-describedby="customer-error"
						>
							<option value="" disabled>
								Select a customer
							</option>
							{customers
								.filter((customer) =>
									customer.name.toLowerCase().includes(searchTerm.toLowerCase())
								)
								.map((customer) => (
									<option key={customer.id} value={customer.id}>
										{customer.name}
									</option>
								))}
						</select>
						<UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] translate-y-[0.7rem] text-gray-500" />
					</div>
					{/* <div id="customer-error" aria-live="polite" aria-atomic="true">
						{state.errors?.customerId &&
							state.errors.customerId.map((error: string) => (
								<p className="mt-2 text-sm text-red-500" key={error}>
									{error}
								</p>
							))}
					</div> */}
				</div>

				{/* Vehicles */}
				<div className="mb-4">
					<label htmlFor="vehicle" className="mb-2 block text-sm font-medium">
						Choose vehicle
					</label>
					<div className="relative">
						{selectedCustomer && (
							<select
								id="vehicle"
								name="carId"
								onChange={(e) => handleVehicleChange(e.target.value)}
								className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
								defaultValue=""
								aria-describedby="customer-error"
							>
								<option value="" disabled>
									Select a vehicle
								</option>
								{customers
									.filter((customer) => customer.id === selectedCustomer)
									.map((customer) =>
										customer.Cars.map((car) => (
											<option key={car.carId} value={car.carId}>
												{`${car.carMake}-${car.carModel}-${car.carYear}-${car.carLicensePlate}`}
											</option>
										))
									)}
							</select>
						)}
						<CameraIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
					</div>
					{/* <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.customerId &&
              state.errors.customerId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div> */}
				</div>

				{/* Invoice Service Request */}
				<div className="mb-4">
					<label htmlFor="service" className="mb-2 block text-sm font-medium">
						Service Request Description
					</label>
					<textarea
						id="service"
						name="service"
						rows={3}
						cols={100}
						className="w-full resize"
					></textarea>
				</div>

				{/* Invoice Amount */}
				<div className="mb-4">
					<label htmlFor="amount" className="mb-2 block text-sm font-medium">
						Choose an amount
					</label>
					<div className="relative mt-2 rounded-md">
						<div className="relative">
							<input
								id="amount"
								name="amount"
								type="number"
								step="0.01"
								placeholder="Enter USD amount"
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
								aria-describedby="amount-error"
							/>
							<CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
						{/* <div id="amount-error" aria-live="polite" aria-atomic="true">
							{state.errors?.amount &&
								state.errors.amount.map((error: string) => (
									<p className="mt-2 text-sm text-red-500" key={error}>
										{error}
									</p>
								))}
						</div> */}
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
			</div>
			<div className="mt-6 flex justify-end gap-4">
				<Link
					href="/dashboard/invoices"
					className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
				>
					Cancel
				</Link>
				<Button type="submit">Create Invoice</Button>
			</div>
		</form>
	);
}
