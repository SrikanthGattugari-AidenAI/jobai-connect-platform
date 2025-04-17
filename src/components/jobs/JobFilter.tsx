
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";

// Mocked data - in a real app, these would be fetched from an API
const countries = [
  { name: "Remote", cities: [] },
  { name: "USA", cities: ["New York", "San Francisco", "Los Angeles"] },
  { name: "UK", cities: ["London", "Manchester", "Birmingham"] },
  { name: "Germany", cities: ["Berlin", "Munich", "Hamburg"] },
  { name: "India", cities: ["Bangalore", "Mumbai", "Delhi"] },
  { name: "Canada", cities: ["Toronto", "Vancouver", "Montreal"] },
];

const categories = [
  "Software Development",
  "Data Science",
  "Design",
  "Marketing",
  "Management",
  "DevOps",
  "Sales",
  "Customer Support",
];

const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "UX/UI Designer",
  "Product Manager",
  "DevOps Engineer",
  "Sales Representative",
  "Customer Support Specialist",
];

const employmentTypes = [
  "full-time",
  "part-time",
  "contract",
  "freelance",
];

const experienceLevels = [
  "entry",
  "mid",
  "senior",
  "executive",
];

export interface JobFilterOptions {
  country: string;
  city: string;
  category: string;
  role: string;
  locationType: string;
  employmentType: string;
  experienceLevel: string;
  search: string;
}

interface JobFilterProps {
  onFilterChange: (filters: JobFilterOptions) => void;
}

export function JobFilter({ onFilterChange }: JobFilterProps) {
  const [filters, setFilters] = useState<JobFilterOptions>({
    country: "",
    city: "",
    category: "",
    role: "",
    locationType: "all",
    employmentType: "",
    experienceLevel: "",
    search: "",
  });

  const [availableCities, setAvailableCities] = useState<string[]>([]);

  // Update available cities when country changes
  useEffect(() => {
    if (filters.country && filters.country !== "Remote") {
      const selectedCountry = countries.find((c) => c.name === filters.country);
      setAvailableCities(selectedCountry?.cities || []);
    } else {
      setAvailableCities([]);
    }
    // Reset city when country changes
    setFilters((prev) => ({ ...prev, city: "" }));
  }, [filters.country]);

  // Apply filters whenever they change
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, field: keyof JobFilterOptions) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleLocationTypeChange = (value: string) => {
    const newFilters = { ...filters, locationType: value };
    
    // If "Remote" is selected, clear country and city
    if (value === "remote") {
      newFilters.country = "Remote";
      newFilters.city = "";
    }
    // If "Onsite" is selected and country is "Remote", clear it
    else if (value === "onsite" && filters.country === "Remote") {
      newFilters.country = "";
      newFilters.city = "";
    }
    
    setFilters(newFilters);
  };

  const handleReset = () => {
    setFilters({
      country: "",
      city: "",
      category: "",
      role: "",
      locationType: "all",
      employmentType: "",
      experienceLevel: "",
      search: "",
    });
  };

  return (
    <Card className="p-6">
      <div className="grid gap-6">
        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            name="search"
            placeholder="Search jobs, companies, or keywords..."
            className="pl-10"
            value={filters.search}
            onChange={handleInputChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Location Type */}
          <div className="space-y-2">
            <Label htmlFor="locationType">Location Type</Label>
            <Select
              value={filters.locationType}
              onValueChange={(value) => handleLocationTypeChange(value)}
            >
              <SelectTrigger id="locationType">
                <SelectValue placeholder="Any Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="remote">Remote Only</SelectItem>
                <SelectItem value="onsite">Onsite Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Country */}
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select
              value={filters.country}
              onValueChange={(value) => handleSelectChange(value, "country")}
              disabled={filters.locationType === "remote"}
            >
              <SelectTrigger id="country">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Country</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country.name} value={country.name}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* City */}
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Select
              value={filters.city}
              onValueChange={(value) => handleSelectChange(value, "city")}
              disabled={!filters.country || filters.country === "Remote" || availableCities.length === 0}
            >
              <SelectTrigger id="city">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any City</SelectItem>
                {availableCities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Employment Type */}
          <div className="space-y-2">
            <Label htmlFor="employmentType">Job Type</Label>
            <Select
              value={filters.employmentType}
              onValueChange={(value) => handleSelectChange(value, "employmentType")}
            >
              <SelectTrigger id="employmentType">
                <SelectValue placeholder="Select Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Job Type</SelectItem>
                {employmentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.replace('-', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={filters.category}
              onValueChange={(value) => handleSelectChange(value, "category")}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Category</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={filters.role}
              onValueChange={(value) => handleSelectChange(value, "role")}
            >
              <SelectTrigger id="role">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Role</SelectItem>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Experience Level */}
          <div className="space-y-2">
            <Label htmlFor="experienceLevel">Experience Level</Label>
            <Select
              value={filters.experienceLevel}
              onValueChange={(value) => handleSelectChange(value, "experienceLevel")}
            >
              <SelectTrigger id="experienceLevel">
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Level</SelectItem>
                {experienceLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Reset Button */}
          <div className="flex items-end">
            <Button variant="outline" onClick={handleReset} className="w-full">
              Reset Filters
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
