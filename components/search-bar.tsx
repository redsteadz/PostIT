"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type SearchBarProps = {
  onSearchAction: (query: string, useSemantic: boolean) => void;
};

export default function SearchBar({ onSearchAction }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [semantic, setSemantic] = useState(false);

  const handleSearch = () => {
    onSearchAction(query.trim(), semantic);
  };

  return (
    <div className="flex flex-col gap-3 p-4 w-full max-w-xl mx-auto">
      <Input
        placeholder="Search blog posts..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          handleSearch();
        }}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Switch
            id="semantic-mode"
            checked={semantic}
            onCheckedChange={setSemantic}
          />
          <Label htmlFor="semantic-mode">Semantic Search</Label>
        </div>
        <Button onClick={handleSearch}>Search</Button>
      </div>
    </div>
  );
}
