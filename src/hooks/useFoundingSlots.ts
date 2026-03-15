import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

const QUERY_KEY = ["founding-slots"];

export interface FoundingSlots {
  claimed: number;
  total: number;
  remaining: number;
}

async function fetchSlots(): Promise<FoundingSlots> {
  const { data } = await supabase
    .from("founding_customer_slots")
    .select("claimed_slots, total_slots")
    .limit(1)
    .single();

  const claimed = data?.claimed_slots ?? 3;
  const total = data?.total_slots ?? 20;
  return { claimed, total, remaining: total - claimed };
}

export function useFoundingSlots() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel("founding_slots_shared")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "founding_customer_slots" },
        (payload) => {
          const row = payload.new as any;
          if (row) {
            const claimed = row.claimed_slots ?? 3;
            const total = row.total_slots ?? 20;
            queryClient.setQueryData<FoundingSlots>(QUERY_KEY, {
              claimed,
              total,
              remaining: total - claimed,
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: fetchSlots,
    staleTime: 60_000,
    initialData: { claimed: 3, total: 20, remaining: 17 },
  });
}
