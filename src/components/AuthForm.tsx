'use client'
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})




export const AuthForm = () => {

    const formSubmitHandler = (values: z.infer<typeof formSchema>) => {
      console.log(values)
    }
    
  return (
    <div>
      
    </div>
  )
}
