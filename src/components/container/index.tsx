import { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
    return (
        <div className="max-w-[1024px] px-3 mx-auto flex h-screen py-3">
            {children}
        </div>
    )
}