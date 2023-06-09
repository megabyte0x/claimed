import { z } from "zod";



const userSchema = z.object({
    did: z.string({
        required_error: "DID is required."
    }),
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Inavalid Email"
    }).email(),
})