import { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
    return (
        <div className="max-w-[850px] px-3 mx-auto">
            {children}
        </div>
    )
}