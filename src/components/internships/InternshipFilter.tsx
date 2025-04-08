
import { useState, useEffect } from "react";
import { CheckIcon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { countriesWithCities, categories } from "@/lib/data";
import { CountryWithCities, Category } from "@/types";

interface InternshipFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  country: string;
  city: string;
  category: string;
  role: string;
  locationType: string;
  search: string;
}

export function InternshipFilter({ onFilterChange }: InternshipFilterProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    country: "",
    city: "",
    category: "",
    role: "",
    locationType: "all",
    search: "",
  });
  
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [availableRoles, setAvailableRoles] = useState<string[]>([]);
  
  useEffect(() => {
    // Set available cities based on selected country
    if (filters.country) {
      const country = countriesWithCities.find(c => c.country === filters.country);
      setAvailableCities(country ? country.cities : []);
      
      // Reset city if country changes
      if (!country?.cities.includes(filters.city)) {
        setFilters(prev => ({ ...prev, city: "" }));
      }
    } else {
      setAvailableCities([]);
      setFilters(prev => ({ ...prev, city: "" }));
    }
  }, [filters.country]);
  
  useEffect(() => {
    // Set available roles based on selected category
    if (filters.category) {
      const category = categories.find(c => c.name === filters.category);
      setAvailableRoles(category ? category.roles : []);
      
      // Reset role if category changes
      if (!category?.roles.includes(filters.role)) {
        setFilters(prev => ({ ...prev, role: "" }));
      }
    } else {
      setAvailableRoles([]);
      setFilters(prev => ({ ...prev, role: "" }));
    }
  }, [filters.category]);
  
  useEffect(() => {
    // Notify parent component of filter changes
    onFilterChange(filters);
  }, [filters, onFilterChange]);
  
  const handleLocationTypeChange = (value: string) => {
    setFilters(prev => ({ 
      ...prev, 
      locationType: value,
      // Reset country and city if "remote" is selected
      ...(value === "remote" ? { country: "Remote", city: "Remote" } : {}),
      ...(value === "onsite" ? { country: "", city: "" } : {}),
      ...(value === "all" ? { country: "", city: "" } : {})
    }));
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };
  
  const handleClearFilters = () => {
    setFilters({
      country: "",
      city: "",
      category: "",
      role: "",
      locationType: "all",
      search: "",
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          placeholder="Search internships..."
          value={filters.search}
          onChange={handleSearchChange}
          className="flex-1"
        />
        <Button onClick={handleClearFilters} variant="outline" size="sm" className="whitespace-nowrap">
          Clear Filters
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div>
          <RadioGroup
            value={filters.locationType}
            onValueChange={handleLocationTypeChange}
            className="flex flex-row space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="remote" id="remote" />
              <Label htmlFor="remote">Remote</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="onsite" id="onsite" />
              <Label htmlFor="onsite">On-site</Label>
            </div>
          </RadioGroup>
        </div>
        
        {filters.locationType !== "remote" && (
          <>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="justify-between w-full"
                >
                  {filters.country || "Select country"}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-full" align="start">
                <Command>
                  <CommandInput placeholder="Search country..." />
                  <CommandList>
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandGroup>
                      {countriesWithCities.map((country) => (
                        <CommandItem
                          key={country.country}
                          value={country.country}
                          onSelect={() => setFilters(prev => ({ ...prev, country: country.country }))}
                        >
                          <CheckIcon
                            className={`mr-2 h-4 w-4 ${
                              filters.country === country.country ? "opacity-100" : "opacity-0"
                            }`}
                          />
                          {country.country}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            
            {filters.country && availableCities.length > 0 && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="justify-between w-full"
                  >
                    {filters.city || "Select city"}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-full" align="start">
                  <Command>
                    <CommandInput placeholder="Search city..." />
                    <CommandList>
                      <CommandEmpty>No city found.</CommandEmpty>
                      <CommandGroup>
                        {availableCities.map((city) => (
                          <CommandItem
                            key={city}
                            value={city}
                            onSelect={() => setFilters(prev => ({ ...prev, city }))}
                          >
                            <CheckIcon
                              className={`mr-2 h-4 w-4 ${
                                filters.city === city ? "opacity-100" : "opacity-0"
                              }`}
                            />
                            {city}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            )}
          </>
        )}
        
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="justify-between w-full"
            >
              {filters.category || "Select category"}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-full" align="start">
            <Command>
              <CommandInput placeholder="Search category..." />
              <CommandList>
                <CommandEmpty>No category found.</CommandEmpty>
                <CommandGroup>
                  {categories.map((category) => (
                    <CommandItem
                      key={category.id}
                      value={category.name}
                      onSelect={() => setFilters(prev => ({ ...prev, category: category.name }))}
                    >
                      <CheckIcon
                        className={`mr-2 h-4 w-4 ${
                          filters.category === category.name ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      {category.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        
        {filters.category && availableRoles.length > 0 && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="justify-between w-full"
              >
                {filters.role || "Select role"}
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-full" align="start">
              <Command>
                <CommandInput placeholder="Search role..." />
                <CommandList>
                  <CommandEmpty>No role found.</CommandEmpty>
                  <CommandGroup>
                    {availableRoles.map((role) => (
                      <CommandItem
                        key={role}
                        value={role}
                        onSelect={() => setFilters(prev => ({ ...prev, role }))}
                      >
                        <CheckIcon
                          className={`mr-2 h-4 w-4 ${
                            filters.role === role ? "opacity-100" : "opacity-0"
                          }`}
                        />
                        {role}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}
