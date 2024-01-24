
import { Button } from "@/components/ui/button" //button from shadcn

import { zodResolver } from "@hookform/resolvers/zod" //zod resolver to handle the form
import { useForm } from "react-hook-form" //form from c=shadcn

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form" //form dependencies from shadcn
import { Input } from "@/components/ui/input" //input from shadcn
import { SignupValidation } from "@/lib/validation" // signup validation function to set the form values
import { z } from "zod"
import Loader from "@/components/ui/shared/Loader" //loading svg component
import { Link } from "react-router-dom" // react router dom link function

import { useToast } from "@/components/ui/use-toast" // toast gotten from shadcn
import { useCreateUserAccount } from "@/lib/react-query/queriesAndMutations" //using mutation to get create user account so u wont need to call it from the api


const SignupForm = () => {
  const { toast } = useToast()

  const { mutateAsync:createUserAccount, isLoading:isCreatingUser } = useCreateUserAccount()

   // 1. Define your form.
   const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    // create user
    const newUser = await createUserAccount(values)
    // handle creation error and return a toast saying an error occured while creatring an account
    if (!newUser) {
      return toast({ title: "Sign up failed, please try again." })
    }
    //const session = await SignInAccount()
  }

  return (
    <Form {...form}>

      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">To use snapgram, please enter your details</p>

        <form onSubmit={form.handleSubmit(onSubmit)} 
          className="flex flex-col gap-4 w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" 
          className="shad-button_primary">
            {isCreatingUser ? <div className="flex-center gap-4"><Loader /> Loading...</div> : "sign up"}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account ? <Link to='/sign-in' className="text-primary-500 text-small-semibold ml-1">Log in</Link>
          </p>
      </form>
      </div>
    </Form>
  )
}

export default SignupForm
