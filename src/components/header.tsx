import Link from "next/link";
import { Profile } from "@/components/profile";
import { ThemeSwitcher } from "@/components/theme-switcher";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center">
          <span className="font-bold">Logo</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <Profile />
        </div>
      </div>
    </header>
  );
}
