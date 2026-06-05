import { redirect } from "next/navigation";
import { type User } from "@supabase/supabase-js";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import {
  dashboardFallbackRows,
  formatDashboardRow,
  type DashboardRow,
} from "@/lib/dashboard";
import { isMissingRelationError } from "@/lib/supabase/errors";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";

type ProfileRecord = {
  business_id: string | null;
  full_name: string | null;
};

type BusinessRecord = {
  id: string;
  name: string;
  google_review_url: string | null;
};

type ReviewRequestRecord = {
  id: string;
  customer_name: string;
  customer_phone: string;
  status: string;
  sent_at: string | null;
  clicked_at: string | null;
  review_left_at: string | null;
};

async function bootstrapProfileForUser(user: User) {
  const supabase = createServerSupabaseClient();
  const businessName =
    typeof user.user_metadata?.business_name === "string" && user.user_metadata.business_name.trim().length > 0
      ? user.user_metadata.business_name.trim()
      : "Reputo";

  const { data: businessData, error: businessError } = await supabase
    .from("businesses")
    .insert({
      name: businessName,
    })
    .select("id, name, google_review_url")
    .single();

  if (businessError) {
    throw businessError;
  }

  const nextProfile = {
    id: user.id,
    business_id: (businessData as BusinessRecord).id,
    full_name: typeof user.user_metadata?.full_name === "string" ? user.user_metadata.full_name : null,
    role: "owner",
  };

  const { error: profileError } = await supabase.from("profiles").upsert(nextProfile);

  if (profileError) {
    throw profileError;
  }

  return {
    profile: {
      business_id: nextProfile.business_id,
      full_name: nextProfile.full_name,
    } satisfies ProfileRecord,
    business: businessData as BusinessRecord,
  };
}

function getStats(rows: DashboardRow[]) {
  if (!rows.length) {
    return {
      sent: 34,
      clicked: 18,
      reviewed: 7,
      average: "4.7",
    };
  }

  const clicked = rows.filter((row) => row.clicked === "Kyllä").length;
  const reviewed = rows.filter((row) => row.status === "Arvostelu jätetty").length;

  return {
    sent: rows.length,
    clicked,
    reviewed,
    average: "4.7",
  };
}

export default async function DashboardPage() {
  if (!isSupabaseConfigured) {
    redirect("/login?message=Lisää+Supabase-ympäristömuuttujat+jatkaaksesi.");
  }

  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  let profile: ProfileRecord | null = null;
  let business: BusinessRecord | null = null;
  let rows: DashboardRow[] = dashboardFallbackRows;
  let canPersistRequests = false;

  try {
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("business_id, full_name")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError && !isMissingRelationError(profileError)) {
      throw profileError;
    }

    profile = (profileData as ProfileRecord | null) ?? null;

    if (!profile?.business_id) {
      const bootstrapped = await bootstrapProfileForUser(user);
      profile = bootstrapped.profile;
      business = bootstrapped.business;
    }
  } catch (error) {
    console.error("Failed to load profile data", error);
  }

  if (profile?.business_id) {
    try {
      const { data: businessData, error: businessError } = await supabase
        .from("businesses")
        .select("id, name, google_review_url")
        .eq("id", profile.business_id)
        .maybeSingle();

      if (businessError && !isMissingRelationError(businessError)) {
        throw businessError;
      }

      business = (businessData as BusinessRecord | null) ?? null;
    } catch (error) {
      console.error("Failed to load business data", error);
    }

    try {
      const { data: requestData, error: requestError } = await supabase
        .from("review_requests")
        .select("id, customer_name, customer_phone, status, sent_at, clicked_at, review_left_at")
        .eq("business_id", profile.business_id)
        .order("created_at", { ascending: false })
        .limit(8)
        .returns<ReviewRequestRecord[]>();

      if (requestError && !isMissingRelationError(requestError)) {
        throw requestError;
      }

      if (!requestError) {
        canPersistRequests = true;
      }

      if (requestData && requestData.length > 0) {
        rows = requestData.map(formatDashboardRow);
      }
    } catch (error) {
      console.error("Failed to load review request data", error);
    }
  }

  const stats = getStats(rows);

  return (
    <DashboardShell
      businessId={profile?.business_id ?? null}
      businessName={business?.name ?? "Reputo"}
      canPersistRequests={canPersistRequests}
      rows={rows}
      stats={stats}
      userEmail={user.email ?? ""}
    />
  );
}
