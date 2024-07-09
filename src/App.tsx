// Importing ZOD for schema validation
// Install with: npm install zod
import { z } from "zod";

// Importing React Hook Form for form handling
import { useForm } from "react-hook-form";

// Integrating Zod with React Hook Form
// Install with: npm install @hookform/resolvers
import { zodResolver } from "@hookform/resolvers/zod";

// Defining a schema for sign-up form validation using Zod
const signUpSchema = z
  .object({
    // Validates if input is a string, with conditions: 3-25 characters long, only letters, numbers, and underscores
    userName: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .max(25, "Username must not be greater than 25 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Only letters, numbers, and underscore (_) allowed"
      ),
    // Email validation based on HTML5 email input pattern (covers a wide range of valid email addresses)
    email: z.string().email(),
    // Validates if full name is at least 3 characters long and contains a space (first and last name required)
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
    // Validates if age is at least 18
    age: z.string().refine(
      (age) => {
        return Number(age) >= 18;
      },
      { message: "You must be 18 years or older" }
    ),
    // Validates if password is at least 10 characters long
    password: z.string().min(10, "Password must be at least 10 characters"),
    // Placeholder for confirm password, validation will be handled in a custom refinement
    confirmPassword: z.string(),
  })
  // Define a custom validation check to ensure password and confirm password match
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

// Extracting the inferred type from the Zod schema for use in form typing
type SignUpSchema = z.infer<typeof signUpSchema>;

export function RegisterForm() {
  // Setting up React Hook Form with Zod resolver for validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  // Handling form submission
  const onSubmit = async (data: SignUpSchema) => {
    // Simulating a server request with a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Optional: handle successful form submission (e.g., reset form, display success message)
    reset();
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
          {/* User Name Input Field */}
          <input
            {...register("userName")}
            type="input"
            placeholder="User Name"
            className="px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-zinc-400"
          />
          {errors.userName && (
            <p className="text-rose-600 text-xs">{`${errors.userName.message}`}</p>
          )}
          {/* Email Input Field */}
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-zinc-400"
          />
          {errors.email && (
            <p className="text-rose-600 text-xs">{`${errors.email.message}`}</p>
          )}
          {/* Full Name Input Field */}
          <input
            {...register("fullName")}
            type="input"
            placeholder="Full Name"
            className="px-4 py-2 rounded-md focus:outline-none text-zinc-600 focus:ring focus:ring-zinc-400"
          />
          {errors.fullName && (
            <p className="text-rose-600 text-xs">{`${errors.fullName.message}`}</p>
          )}
          {/* Age Input Field */}
          <input
            {...register("age")}
            type="input"
            placeholder="Age"
            className="px-4 py-2 rounded-md focus:outline-none text-zinc-600 focus:ring focus:ring-zinc-400"
          />
          {errors.age && (
            <p className="text-rose-600 text-xs">{`${errors.age.message}`}</p>
          )}
          {/* Password Input Field */}
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-zinc-400"
          />
          {errors.password && (
            <p className="text-rose-600 text-xs">{`${errors.password.message}`}</p>
          )}
          {/* Confirm Password Input Field */}
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
