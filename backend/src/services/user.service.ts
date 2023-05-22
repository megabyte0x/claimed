import prisma from "../db/prismaConnect";


export const createUser = async (did: string, email: string) => {
    return await prisma.user.upsert({
        where: {
            email
        },
        update: {
            did
        },
        create: {
            email,
            did
        }
    })
}

export const createPrize = async (amount: number, distriutedAmong: number) => {
    return await prisma.prize.create({
        data: {
            amount,
            distriutedAmong,
        }
    })
}