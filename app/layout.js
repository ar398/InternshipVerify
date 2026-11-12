import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "InternshipVerify",
  description: "AICTE Internship Verification Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}