import { z } from "zod";



const prizeSchema = z.object({
    amount: z.number({
        required_error: "Amount is Required"
    }),
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Inavalid Email"
    }).email(),
})