import { redirect } from "next/navigation";

import { AuthShell } from "@/components/auth/auth-shell";
import { SignupForm } from "@/components/auth/signup-form";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function SignupPage({
  searchParams,
}: {
  searchParams?: { message?: string };
}) {
  if (isSupabaseConfigured) {
    const supabase = createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      redirect("/dashboard");
    }
  }

  return (
    <AuthShell
      eyebrow="Luo tili"
      title="Aloita Reputon käyttö"
      description="Luo yrityksellesi tili ja siirry suoraan ensimmäiseen hallintapaneelin näkymään."
    >
      <SignupForm message={searchParams?.message} />
    </AuthShell>
  );
}
