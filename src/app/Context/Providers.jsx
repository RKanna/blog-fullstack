"use client";

import { AuthProvider } from "./AuthContext";
import BlogContext from "./BlogContext";

export function Providers({ children }) {
  return (
    <AuthProvider>
      {/* <BlogProvider> */}
      <BlogContext>{children}</BlogContext>
      {/* </BlogProvider> */}
    </AuthProvider>
  );
}
