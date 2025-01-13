import { LoginForm } from "@/components/auth/login-form";
import { getCurrentEmployee } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const employee = await getCurrentEmployee();

  if (employee) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-green-800">
            Employee Login
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your work email to access the dashboard
          </p>
        </div>
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
