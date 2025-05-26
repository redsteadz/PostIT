"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { Card } from "@/components/ui/card";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: (theme.vars || theme).palette.text.secondary,
  ...theme.applyStyles?.("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const getRandomContent = () => {
  const type = ["image", "video", "paragraph", "gif"][
    Math.floor(Math.random() * 4)
  ];
  switch (type) {
    case "image":
      return (
        <img
          src={`https://images.unsplash.com/photo-1709917241494-48fdf74f2640?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
          alt="Random"
          style={{ width: "100%", borderRadius: 8 }}
        />
      );
    case "gif":
      return (
        <img
          src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
          alt="GIF"
          style={{ width: "100%", borderRadius: 8 }}
        />
      );
    case "video":
      return (
        <video controls style={{ width: "100%", borderRadius: 8 }}>
          <source
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      );
    case "audio":
      return (
        <audio controls style={{ width: "auto" }}>
          <source
            src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
            type="audio/mpeg"
          />
          Your browser does not support the audio element.
        </audio>
      );
    case "paragraph":
      return (
        <p
          style={{ textAlign: "left" }}
          className="p-4 text-sm text-left sm:text-base md:text-lg"
        >
          {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et urna nec eros vulputate pretium.`}
        </p>
      );
  }
};

export default function BasicMasonry() {
  return (
    <div className="px-2 sm:px-14">
      <Masonry columns={{ xs: 2, sm: 3 }} spacing={2}>
        {Array.from({ length: 20 }).map((_, index) => (
          <Card key={index}>{getRandomContent()}</Card>
        ))}
      </Masonry>
    </div>
  );
}
