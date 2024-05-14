import {
	CheckIcon,
	ClockIcon,
	NoSymbolIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

function InvoiceStatus({ status }: { status: string }) {
	return (
		<span
			className={clsx(
				"inline-flex items-center rounded-full px-2 py-1 text-xs",
				{
					"bg-orange-400 text-slate-100": status === "PENDING",
					"bg-green-500 text-white": status === "PAID",
					"bg-red-500 text-white": status === "CANCELED",
				}
			)}
		>
			{status === "PENDING" ? (
				<>
					Pending
					<ClockIcon className="ml-1 w-4 text-slate-100" />
				</>
			) : null}
			{status === "PAID" ? (
				<>
					Paid
					<CheckIcon className="ml-1 w-4 text-white" />
				</>
			) : null}
			{status === "CANCELED" ? (
				<>
					Canceled
					<NoSymbolIcon className="ml-1 w-4 text-white" />
				</>
			) : null}
		</span>
	);
}

export default InvoiceStatus;
