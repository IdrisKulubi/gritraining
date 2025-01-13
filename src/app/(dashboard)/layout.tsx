import { DashboardNav } from "@/components/dashboard/nav";
import { ThemeProvider } from "@/components/themes/theme-provider";
import { getCurrentEmployee } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const employee = await getCurrentEmployee();

  if (!employee) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen dark:bg-gray-900">
      <DashboardNav employee={employee} />
          <main className="container mx-auto px-4 py-8">
                <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
                  {children}
                  </ThemeProvider>
                  </main>
    </div>
  );
}
