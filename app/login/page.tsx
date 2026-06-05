import { redirect } from "next/navigation";

import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function LoginPage({
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
      eyebrow="Kirjaudu sisään"
      title="Tervetuloa takaisin Reputoon"
      description="Seuraa arvostelupyyntöjäsi ja pidä asiakaspalautteen kasvu hallinnassa yhdestä paikasta."
    >
      <LoginForm message={searchParams?.message} />
    </AuthShell>
  );
}
