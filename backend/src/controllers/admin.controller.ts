import { Request, Response } from "express"
import { asyncWrap } from "../middlewares/async.middleware"
import { AddAwardRequest } from "../schemas/prize.schema"
import { ZodError } from "zod";
import { throwError } from "../helpers/errorHandler.helper";
import { createPrize, createUser } from "../services/user.service";


export const addAwardController = asyncWrap(async (req: Request<{}, {}, AddAwardRequest["body"]>, res: Response) => {
    const { amount, distriutedAmong, users } = req.body;
    try {
        if (distriutedAmong !== users.length) throwError(422, "Given users should be equal to the number of users won the award.")

        // Add data to user and prize
        const userIds: string[] = []
        await Promise.all(
            users.map(async (user) => {
                const userCreated = await createUser(user.did, user.email)
                if (!userCreated) throwError(502, "Error creating user")
                else userIds.push(userCreated.id)
            })
        )
        const prizeCreated = await createPrize(amount, distriutedAmong)

        // generate the claim

        // add it to Claim table

        res.status(201).json({ userIds, prizeCreated })
    } catch (e: any) {
        if (e instanceof ZodError) {
            console.error(e.flatten);
            throwError(400, "Bad data Input");
        } else {
            throwError(409, e.message);
        }

    }
})