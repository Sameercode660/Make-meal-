import {z} from 'zod'

export const emailSchema = z.string().email()
export const password = z.string().min(8)
export const numericStringSchema = z.string().refine((val) => /^\d+$/.test(val), {
    message: "Input should contain only digits",
  });
  