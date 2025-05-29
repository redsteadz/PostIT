"use client";

import { GiphyFetch } from "@giphy/js-fetch-api";
import {
  Grid, // our UI Component to display the results
  SearchBar, // the search bar the user will type into
  SearchContext, // the context that wraps and connects our components
  SearchContextManager, // the context manager, includes the Context.Provider
  SuggestionBar, // an optional UI component that displays trending searches and channel / username results
} from "@giphy/react-components";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useContext } from "react";

const API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY;

if (!API_KEY) {
  throw new Error(
    "Missing Giphy API key. Set NEXT_PUBLIC_GIPHY_API_KEY in your .env.local file.",
  );
}

function GIFGridChild({
  setSrcAction,
  setOpenAction,
}: {
  setSrcAction: (src: string) => void;
  setOpenAction: (state: boolean) => void;
}) {
  const { fetchGifs, searchKey } = useContext(SearchContext);

  return (
    <>
      <SearchBar />
      <SuggestionBar />
      <div className="flex justify-center">
        <Grid
          width={440}
          columns={3}
          key={searchKey}
          gutter={6}
          noLink={true}
          fetchGifs={fetchGifs}
          onGifClick={(gif, e) => {
            const url = gif.images.fixed_height;
            setSrcAction(url.url);
            setOpenAction(false);
          }}
        />
      </div>
    </>
  );
}

export default function GifGrid({
  setSrcAction,
  setOpenAction,
}: {
  setSrcAction: (src: string) => void;
  setOpenAction: (state: boolean) => void;
}) {
  return (
    <SearchContextManager apiKey={API_KEY!}>
      <GIFGridChild setSrcAction={setSrcAction} setOpenAction={setOpenAction} />
    </SearchContextManager>
  );
}
