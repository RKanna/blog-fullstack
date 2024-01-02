"use client";

import { AuthProvider } from "./AuthContext";
import { BlogProvider } from "./BlogContext";

export function Providers({ children }) {
  return (
    <AuthProvider>
      <BlogProvider>{children}</BlogProvider>
    </AuthProvider>
  );
}
