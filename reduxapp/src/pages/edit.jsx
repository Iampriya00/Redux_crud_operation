import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { useNavigate, useParams } from "react-router-dom";
import { editUser } from "@/store/auth/userSlice";

function EditUserDetails() {
  const { id } = useParams();
  const users = useAppSelector((state) => state.user.users);

  const navigate = useNavigate();
  const userData = users.find((user) => user.id === id);
  console.log(userData);

  const dispatch = useAppDispatch();
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name is required.",
    }),
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Invalid email format",
    }),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userData?.name || "",
      email: userData?.email || "",
    },
  });

  useEffect(() => {
    if (userData) {
      form.reset({
        name: userData.name,
        email: userData.email,
      });
    }
  }, [userData, form]);
  const onSubmit = (data) => {
    const updatedUser = { id, ...data };
    dispatch(editUser(updatedUser));
    navigate("/");
  };
  if (!userData) {
    return <div>User not found</div>;
  }
  return (
    <div>
      <h1 className="font-bold m-12">User {id}</h1>
      <div className="container mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
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
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Update</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default EditUserDetails;
