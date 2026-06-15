"use client";

import overlays from "@/lib/artboard-overlays.json";
import { FullArtboardPage } from "./FullArtboardPage";
import { fontAptos } from "@/lib/design";

export function AccountPage() {
  const page = overlays.pages.account;

  return (
    <FullArtboardPage pageKey="account">
      {page.inputs?.map((field) => (
        <input
          key={field.id}
          id={field.id}
          name={field.id}
          type={field.type as "text" | "email" | "password"}
          aria-label={field.placeholder}
          autoComplete={field.id === "password" ? "new-password" : field.id}
          className="artboard-input"
          style={{
            left: field.left,
            top: field.top,
            width: field.width,
            height: field.height,
            fontFamily: fontAptos,
          }}
        />
      ))}
      {page.social?.map((btn) => (
        <button
          key={btn.label}
          type="button"
          aria-label={btn.label}
          className="artboard-social-hit"
          style={{
            left: btn.left,
            top: btn.top,
            width: btn.width,
            height: btn.height,
          }}
        />
      ))}
    </FullArtboardPage>
  );
}
