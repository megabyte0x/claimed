import { z } from "zod";



export const user = {
    did: z.string({
        required_error: "DID is required."
    }),
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Inavalid Email"
    }).email(),
}

export const userSchema = z.object(user)
