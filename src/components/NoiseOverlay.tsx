"use client";

import React from "react";

export default function NoiseOverlay() {
  return (
    <>
      <div className="noise-grain" aria-hidden="true" />
      <div className="crt-overlay" aria-hidden="true" />
    </>
  );
}
