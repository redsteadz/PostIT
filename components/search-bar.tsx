"use client";

import { SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type SearchBarProps = {
  onSearchAction?: (query: string, useSemantic: boolean) => void;
  setQueryAction: React.Dispatch<SetStateAction<string>>;
};

export default function SearchBar({
  onSearchAction,
  setQueryAction,
}: SearchBarProps) {
  const [semantic, setSemantic] = useState(false);

  return (
    <div className="flex flex-col gap-3 p-4 w-full max-w-xl mx-auto">
      <Input
        placeholder="Search blog posts..."
        onChange={(e) => {
          // console.log("Setting input value:", e.target.value);
          setQueryAction(e.target.value ?? "");
        }}
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
        <Button>Search</Button>
      </div>
    </div>
  );
}
