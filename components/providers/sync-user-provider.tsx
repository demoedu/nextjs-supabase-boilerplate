"use client";

import { useSyncUser } from "@/hooks/use-sync-user";

/**
 * Clerk 사용자를 Supabase DB에 자동으로 동기화하는 프로바이더
 *
 * RootLayout에 추가하여 로그인한 모든 사용자를 자동으로 Supabase에 동기화합니다.
 */
export function SyncUserProvider({ children }: { children: React.ReactNode }) {
  useSyncUser();
  return <>{children}</>;
}
