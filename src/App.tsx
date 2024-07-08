import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const signUpSchema = z
  .object({
    nameFull: z.string().includes(" "),
    birthday: z.date(),
    email: z.string().email(),
    password: z.string().min(10, "Password must be at least 10 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

//define type for type safty when
type SignUpSchema = z.infer<typeof signUpSchema>;

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-screen justify-center items-center"
    >
      <div className="flex flex-col gap-y-8 w-80 h-fit p-8 bg-zinc-200 rounded-2xl shadow-lg">
        <h1 className="text-zinc-600 text-2xl font-bold">
          Sign up to continue
        </h1>
        <div className="flex flex-col gap-y-3">
          <input
            {...register("nameFull")}
            type="input"
            placeholder="Full Name"
            className="px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-zinc-400"
          />
          {errors.nameFull && (
            <p className="text-rose-600 text-xs">{`${errors.nameFull.message}`}</p>
          )}
          <input
            {...register("birthday")}
            type="date"
            placeholder="Birthday"
            className="px-4 py-2 rounded-md focus:outline-none text-zinc-600 focus:ring focus:ring-zinc-400"
          />
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-zinc-400"
          />
          {errors.email && (
            <p className="text-rose-600 text-xs">{`${errors.email.message}`}</p>
          )}
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-zinc-400"
          />
          {errors.password && (
            <p className="text-rose-600 text-xs">{`${errors.password.message}`}</p>
          )}
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm password"
            className="px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-zinc-400"
          />
          {errors.confirmPassword && (
            <p className="text-rose-600 text-xs">{`${errors.confirmPassword.message}`}</p>
          )}
        </div>
        <button
          disabled={isSubmitting}
          type="submit"
          className="text-zinc-50 bg-zinc-600 disabled:bg-zinc-400 py-2 rounded-md"
        >
          Create Account
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
