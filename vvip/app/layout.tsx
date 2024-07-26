import type { Metadata } from "next";
import { StoreProvider } from "./storeProvider";
import PageWrapper from "./wrapper";

export const metadata: Metadata = {
  title: "SB ACMS",
  description: "SB ACMS",
  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, boxSizing: "border-box" }}>
        <StoreProvider>
          <PageWrapper>{children}</PageWrapper>
        </StoreProvider>
      </body>
    </html>
  );
}
