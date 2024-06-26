import Link from "next/link";
import styles from "@/app/ui/home.module.css";
import { lusitana } from "@/app/ui/fonts";
import { ArrowRightIcon, LightBulbIcon } from "@heroicons/react/24/outline";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Dashboard",
};

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col p-6">
			<div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
				<LightBulbIcon className="w-10 h-10 text-white" />
				<span className="text-3xl text-white">NBG</span>
			</div>
			<div className="mt-4 flex grow flex-col gap-4 md:flex-row">
				<div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
					<div className={styles.shape} />
					<p
						className={` ${lusitana.className} text-xl text-gray-800 antialiased md:text-3xl md:leading-normal`}
					>
						<strong>Welcome to NBG App.</strong> This is an example application
						built with Next.js and Tailwind CSS.
					</p>
					<Link
						href="/login"
						className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
					>
						<span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
					</Link>
				</div>
			</div>
		</main>
	);
}
