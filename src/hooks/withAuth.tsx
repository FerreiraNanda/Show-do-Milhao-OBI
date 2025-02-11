"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function withAuth(Component: any) {
  return function ProtectedPage(props: any) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (typeof window !== "undefined") {
        const user = localStorage.getItem("user");

        if (!user) {
          router.replace("/login");
        } else {
          setLoading(false);
        }
      }
    }, [router]);

    if (loading) return null; 

    return <Component {...props} />;
  };
}
