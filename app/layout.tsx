import "./globals.css";
import Sidebar from "./components/Sidebar";

export const metadata = {
  title: "Habit Tracker",
  description: "Трекер полезных привычек",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="dark">
      <body className="min-h-screen bg-zinc-950 text-slate-100">
        <div className="min-h-screen bg-zinc-950 text-slate-100">
          <Sidebar />

          <main className="min-h-screen lg:pl-24">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}