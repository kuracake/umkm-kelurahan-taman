"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  House,
  ShoppingBag,
  Store,
  MessageCircle,
} from "lucide-react";

const navItems = [
  {
    label: "Beranda",
    href: "/",
    icon: House,
  },
  {
    label: "Produk",
    href: "/produk",
    icon: ShoppingBag,
  },
  {
    label: "UMKM",
    href: "/umkm",
    icon: Store,
  },
  {
    label: "Kontak",
    href: "/kontak",
    icon: MessageCircle,
  },
];

const HIDE_DELAY = 3000;

export function BottomNav() {
  const pathname = usePathname();

  const [visible, setVisible] = useState(true);

  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHideTimer = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  const showAndResetTimer = () => {
    setVisible(true);

    clearHideTimer();

    hideTimerRef.current = setTimeout(() => {
      setVisible(false);
    }, HIDE_DELAY);
  };

  useEffect(() => {
    if (pathname === "/login") {
      setVisible(false);
      return;
    }

    showAndResetTimer();

    const handleActivity = () => {
      showAndResetTimer();
    };

    window.addEventListener("scroll", handleActivity, {
      passive: true,
    });

    window.addEventListener("touchstart", handleActivity, {
      passive: true,
    });

    window.addEventListener("touchmove", handleActivity, {
      passive: true,
    });

    window.addEventListener("mousemove", handleActivity, {
      passive: true,
    });

    window.addEventListener("click", handleActivity);

    return () => {
      clearHideTimer();

      window.removeEventListener("scroll", handleActivity);
      window.removeEventListener("touchstart", handleActivity);
      window.removeEventListener("touchmove", handleActivity);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("click", handleActivity);
    };
  }, [pathname]);

  if (pathname === "/login") {
    return null;
  }

  return (
    <nav
      className={`
        fixed
        inset-x-0
        bottom-0
        z-30
        px-4
        pb-[calc(env(safe-area-inset-bottom)+12px)]
        transition-all
        duration-500
        ease-out
        sm:hidden
        ${
          visible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-[120%] opacity-0"
        }
      `}
      aria-label="Navigasi utama"
    >
      <div
        className="
          mx-auto
          flex
          max-w-md
          items-center
          justify-between
          gap-1
          rounded-full
          border
          border-slate-100
          bg-white/95
          p-1.5
          shadow-[0_10px_30px_-8px_rgba(14,165,233,0.25)]
          backdrop-blur-md
        "
      >
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href ||
                pathname.startsWith(`${item.href}/`);

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              onClick={showAndResetTimer}
              className={`
                flex
                items-center
                justify-center
                gap-2
                rounded-full
                transition-all
                duration-300
                ease-out
                ${
                  isActive
                    ? "flex-1 bg-brand px-4 py-2.5 shadow-[0_4px_14px_-2px_rgba(14,165,233,0.5)]"
                    : "h-11 w-11 shrink-0"
                }
              `}
            >
              <Icon
                size={19}
                strokeWidth={1.8}
                className={
                  isActive
                    ? "shrink-0 text-white"
                    : "text-slate-400"
                }
              />

              {isActive && (
                <span className="whitespace-nowrap text-xs font-semibold text-white">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}