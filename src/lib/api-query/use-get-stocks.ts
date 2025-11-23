import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase";
import { QueryKeys } from "./keys";
import { stockSchema } from "./types/stock";

export function useGetStocks() {
  return useQuery({
    queryKey: QueryKeys.STOCKS,
    queryFn: async () => {
      const allStocks = await supabase
        .from("investment_symbols_clean")
        .select("*");

      if (allStocks.error) {
        return null;
      }

      const parsed = await stockSchema.safeParseAsync(allStocks.data);

      if (!parsed.success) {
        console.log("Failed to parse stocks");
        return null;
      }

      const stocks = parsed.data;

      return stocks;
    },
  });
}

export function useGetStock(symbol: string) {
  return useQuery({
    queryKey: QueryKeys.STOCK(symbol),
    queryFn: async () => {
      const rawStock = await supabase
        .from("investment_symbols_clean")
        .select("*")
        .eq("symbol", symbol)
        .single();

      if (rawStock.error) {
        return null;
      }

      const parsed = await stockSchema.safeParseAsync(rawStock.data);

      if (!parsed.success) {
        console.log("Failed to parse stock");
        return null;
      }

      return parsed.data;
    },
  });
}
