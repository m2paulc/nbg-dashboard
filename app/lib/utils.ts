import { statusType } from "@prisma/client";

export const formatCurrency = (amount: number) => {
	return (amount / 100).toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
	});
};

export const formatDatetoLocal = (date: Date) => {
	return date.toLocaleDateString("en-US");
};

export const checkStatus = (q: string): statusType => {
	const queryStatus = q.toUpperCase();
	if (
		queryStatus === "PENDING" ||
		queryStatus === "CANCELED" ||
		queryStatus === "PAID"
	) {
		return queryStatus as statusType;
	}
	return q as statusType;
};

export const generatePagination = (currentPage: number, totalPages: number) => {
	// if total number of pages is 7 or less
	// display all pages without ellipsis
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	// if the current page is amonth the first 3 pages
	// show the first 3, an ellipis, and the last 2 pages.
	if (currentPage <= 3) {
		return [1, 2, 3, "...", totalPages - 1, totalPages];
	}

	// if the current page is among the last 3 pages,
	// show the first 2, an ellipsis, and the last 3 pages.
	if (currentPage >= totalPages - 2) {
		return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
	}

	// If the current page is somewhere in the middle,
	// show the first page, an ellipsis, the current page and its neighbors,
	// another ellipsis, and the last page.
	return [
		1,
		"...",
		currentPage - 1,
		currentPage,
		currentPage + 1,
		"...",
		totalPages,
	];
};
