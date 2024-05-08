import { PrismaClient } from "@prisma/client";

declare global {
	var prismaGlobal: PrismaClient;
}

const prismaClientSingleton = () => {
	return new PrismaClient();
};

declare const globalThis: {
	prisma: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") {
	globalThis.prismaGlobal = prisma;
}
