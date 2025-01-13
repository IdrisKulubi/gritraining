import React from "react";
import { ThemeProvider } from "@/components/themes/theme-provider";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-muted/50">
      <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
      {children}
      </ThemeProvider>
    </div>
  );
};

export default Layout;
