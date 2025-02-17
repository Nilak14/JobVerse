import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { Building, MapPin, Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const BrowsePageSearch = () => {
  const searchParams = useSearchParams();

  const [globalSearch, setGlobalSearch] = useState(
    searchParams.get("globalSearch") || ""
  );
  const [companySearch, setCompanySearch] = useState(
    searchParams.get("companySearch") || ""
  );
  const [locationSearch, setLocationSearch] = useState(
    searchParams.get("locationSearch") || ""
  );

  const globalSearchQuery = useDebounce(globalSearch.trim());
  const companySearchQuery = useDebounce(companySearch.trim());
  const locationSearchQuery = useDebounce(locationSearch.trim());

  const updateUrl = (paramsToUpdate: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(paramsToUpdate).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    params.delete("cursor");
    window.history.replaceState(null, "", `?${params.toString()}`);
  };

  useEffect(() => {
    updateUrl({
      globalSearch: globalSearchQuery,
      companySearch: companySearchQuery,
      locationSearch: locationSearchQuery,
    });
  }, [globalSearchQuery, companySearchQuery, locationSearchQuery]);

  return (
    <div className=" relative  lg:sticky z-10 bg-background top-0 lg:top-16 min-h-16 items-center gap-5 mb-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:gap-4">
      <div>
        <Input
          value={globalSearch}
          onChange={(e) => setGlobalSearch(e.target.value)}
          startIcon={Search}
          className="w-full"
          placeholder="Search Jobs "
        />
      </div>
      <div>
        <Input
          value={companySearch}
          onChange={(e) => setCompanySearch(e.target.value)}
          startIcon={Building}
          placeholder="Search By Company Name"
        />
      </div>
      <div>
        <Input
          value={locationSearch}
          onChange={(e) => setLocationSearch(e.target.value)}
          startIcon={MapPin}
          placeholder="Search By Location"
        />
      </div>
    </div>
  );
};
export default BrowsePageSearch;
