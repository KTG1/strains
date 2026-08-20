import "./globals.css";

export const metadata = {
  title: "Strains Main Page",
  description: "Explore premium botanical strains by type, potency, and profile."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
