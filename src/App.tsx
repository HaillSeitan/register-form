// Improting ZOD
//install with: npm install zod,
import { z } from "zod";
//
// Importing React Hook Form
import { useForm } from "react-hook-form";
//
//install with: npm install @hookform/resolvers
import { zodResolver } from "@hookform/resolvers/zod";

const signUpSchema = z
  .object({
    // Validates if input is string, conditions: between 3-25 charakters log, disabeled special characters
    userName: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .max(25, "Username must not be greater than 25 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Only letters, numbers and underscore (_) allowed"
      ),
    // E-Mail validation based on HTML5 email input pattern (covers a wide range of valid email addresses)
    email: z.string().email(),
    //
    fullName: z
      .string()
      .min(3, "Name must be at least 3 characters long")
      .trim()
      .refine(
        (fullName) => {
          return String(fullName).includes(" ");
        },
        { message: "First and last name needed" }
      ),
    // checking if age min 18
    age: z.number().refine(
      (age) => {
        return Number(age) >= 18;
      },
      { message: "You must be 18 years or older" }
    ),
    // Minimum length condition + custom error message
    password: z.string().min(10, "Password must be at least 10 characters"),
    confirmPassword: z.string(),
  })
  // Define custom validation check (Password match)
  .refine((data) => data.password === data.confirmPassword, {
    message: "Try again. Passwords must match",
    // Path of error
    path: ["confirmPassword"],
  });
//

//extract the inferret type - later stored in types.ts
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
            {...register("userName")}
            type="input"
            placeholder="User Name"
            className="px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-zinc-400"
          />
          {errors.userName && (
            <p className="text-rose-600 text-xs">{`${errors.userName.message}`}</p>
          )}
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
            {...register("fullName")}
            type="input"
            placeholder="Full Name"
            className="px-4 py-2 rounded-md focus:outline-none text-zinc-600 focus:ring focus:ring-zinc-400"
          />
          {errors.fullName && (
            <p className="text-rose-600 text-xs">{`${errors.fullName.message}`}</p>
          )}
          <input
            {...register("age")}
            type="input"
            placeholder="Age"
            className="px-4 py-2 rounded-md focus:outline-none text-zinc-600 focus:ring focus:ring-zinc-400"
          />
          {errors.age && (
            <p className="text-rose-600 text-xs">{`${errors.age.message}`}</p>
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
