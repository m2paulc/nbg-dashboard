import { fetchPartsOrderById } from "@/app/lib/data";
import { formatCurrency } from "../lib/utils";

async function PartsOrder({ id }: { id: string }) {
	const partsOrder = (await fetchPartsOrderById(id)) || {
		partStore: "",
		skuNumber: "",
		description: "",
		quantity: 0,
		listPriceInCents: 0,
	};
	const formattedPrice = formatCurrency(Number(partsOrder.listPriceInCents));
	return (
		<div className="flex flex-col gap-4 w-full md:flex-row md:gap-8">
			<div className="w-2/12 mb-4">
				<label htmlFor="partStore" className="mb-2 block text-sm font-medium">
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
				<label htmlFor="partNumber" className="mb-2 block text-sm font-medium">
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
	);
}

export default PartsOrder;
