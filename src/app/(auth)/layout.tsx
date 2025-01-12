import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-muted/50">
      {children}
    </div>
  );
};

export default Layout;
