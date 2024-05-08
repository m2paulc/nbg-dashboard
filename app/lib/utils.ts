export const formatCurrency = (amount: number) => {
	return (amount / 100).toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
	});
};

export const formatDatetoLocal = (date: Date) => {
	return date.toLocaleString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
};
