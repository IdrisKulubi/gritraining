"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ORGANIZATIONS } from "@/db/schema";

interface OrganizationFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function OrganizationFilter({ value, onChange }: OrganizationFilterProps) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium">Organization:</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="All Organizations" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Organizations</SelectItem>
          {ORGANIZATIONS.map((org) => (
            <SelectItem key={org} value={org}>
              {org}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
