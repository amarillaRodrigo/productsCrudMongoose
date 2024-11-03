import { useForm } from "react-hook-form";
import { registerRequest, handleSubmit } from "../api/auth.js";
import React from "react";

const onSubmit = handleSubmit(async (values) => {
  const res = await registerRequest(values);
});

function RegisterPage() {
  const { register, handleSubmit } = useForm();
  return (
    <div className="bg-zinc-800 max-w-d p-10 rounded-md">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          {...register("username", { required: true, minLength: 3 })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Username"
        />
        <input
          type="email"
          {...register("email", { required: true, minLength: 3 })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Email"
        />
        <input
          type="password"
          {...register("password", { required: true, minLength: 3 })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Password"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
