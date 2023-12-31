
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
// control={form.control}
export const UpdateProfile = () => {

    const form = useForm()
    const formConfig = [
        { name: "username", placeholder: "shadcn", description: "This is your public display name." },
        { name: "password", placeholder: "*********", type: "password", description: "This is your password." },
        { name: "email", placeholder: "g@gmail.com", description: "Your personal email both for login and contact." },
        { name: "profileUrl", placeholder: "https://", description: "Your profile picture url." },
    ]
    return (
        <div className="flex items-center pt-10 flex-col bg-gray-100 w-full h-screen px-8 ">
            <div className="p-8 border rounded-xl w-full bg-white shadow-sm">
                <div className="pt-2">

                    <h1 className="text-xl font-bold">Update profile</h1>
                    <h1 className="text-slate-500 pt-2 pb-4">Here is where you update your information</h1>
                    <hr />
                </div>
                <div className="pt-2">
                    <Form {...form}>
                        {formConfig.map(config => {
                            return (
                                <div className="py-2">

                                    <FormField
                                        control={form.control}
                                        name={config.name}
                                        value="bruh"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="capitalize font-bold">{config.label ?? config.name}</FormLabel>
                                                <FormControl>
                                                    <Input placeholder={config.placeholder} type={config.type ?? "text"} className="rounded-lg" {...field} value={config.value ?? ""} />
                                                </FormControl>
                                                <FormDescription className="text-slate-500">{config.description ?? ""}</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )
                        })}

                    </Form>
                </div>
            </div>
        </div>
    )
}

// <FormField
//     name="username"
//     render={({ field }) => (
//         <FormItem>
//             <FormLabel>Username</FormLabel>
//             <FormControl>
//                 <Input placeholder="shadcn" {...field} />
//             </FormControl>
//             <FormDescription>
//                 This is your public display name.
//             </FormDescription>
//             <FormMessage />
//         </FormItem>
//     )}
// />
