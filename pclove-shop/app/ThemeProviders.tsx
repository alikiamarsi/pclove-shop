"use client";

import { ThemeProvider } from "next-themes";

type ProvidersProps = {
    children: React.ReactNode;
};

export default function ThemeProviders({
    children,
}: ProvidersProps) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
        >
            {children}
        </ThemeProvider>
    )
}