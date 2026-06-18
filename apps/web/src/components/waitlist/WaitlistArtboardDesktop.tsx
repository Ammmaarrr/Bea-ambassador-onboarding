import Link from "next/link";

import overlays from "@/lib/waitlist-overlays.json";
import { fontSans } from "@/lib/design";
import type { WaitlistOverlayPageKey } from "@/lib/waitlist-types";

type Props = {
  pageKey: WaitlistOverlayPageKey;
  children?: React.ReactNode;
};

/** Desktop/tablet: artboard PNG at design coordinates + interactive overlays. */
export function WaitlistArtboardDesktop({ pageKey, children }: Props) {
  const page = overlays.pages[pageKey];
  const { width, height } = page;

  return (
    <div
      className="waitlist-artboard-viewport"
      style={{ height: `calc(${height}px * min(1, 100vw / ${width}px))` }}
    >
      <div
        className="waitlist-artboard-canvas artboard-stage"
        style={{ width, height }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={page.src}
          alt=""
          width={width}
          height={height}
          draggable={false}
          style={{ width, height, display: "block", userSelect: "none" }}
        />

        {"back" in page && page.back && (
          <Link
            href={page.back.href}
            aria-label="Go back"
            className="artboard-hit"
            style={{
              left: page.back.left,
              top: page.back.top,
              width: page.back.width,
              height: page.back.height,
            }}
          />
        )}

        {"waitingRoom" in page && page.waitingRoom && (
          <Link
            href={page.waitingRoom.href}
            aria-label={page.waitingRoom.label}
            className="artboard-hit"
            style={{
              left: page.waitingRoom.left,
              top: page.waitingRoom.top,
              width: page.waitingRoom.width,
              height: page.waitingRoom.height,
            }}
          />
        )}

        {"navLinks" in page &&
          page.navLinks?.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              className="artboard-hit"
              style={{
                left: link.left,
                top: link.top,
                width: link.width,
                height: link.height,
              }}
            />
          ))}

        {"heroCta" in page && page.heroCta && (
          <Link
            href={page.heroCta.href}
            aria-label={page.heroCta.label}
            className="artboard-hit"
            style={{
              left: page.heroCta.left,
              top: page.heroCta.top,
              width: page.heroCta.width,
              height: page.heroCta.height,
            }}
          />
        )}

        {"heroEmail" in page && page.heroEmail && (
          <input
            id={page.heroEmail.id}
            type={page.heroEmail.type}
            aria-label={page.heroEmail.placeholder}
            className="artboard-input waitlist-artboard-pill-input"
            style={{
              left: page.heroEmail.left,
              top: page.heroEmail.top,
              width: page.heroEmail.width,
              height: page.heroEmail.height,
              fontFamily: fontSans,
            }}
          />
        )}

        {"heroSubmit" in page && page.heroSubmit && (
          <Link
            href={page.heroSubmit.href}
            aria-label={page.heroSubmit.label}
            className="artboard-hit"
            style={{
              left: page.heroSubmit.left,
              top: page.heroSubmit.top,
              width: page.heroSubmit.width,
              height: page.heroSubmit.height,
            }}
          />
        )}

        {"footerEmail" in page && page.footerEmail && (
          <input
            id={page.footerEmail.id}
            type={page.footerEmail.type}
            aria-label={page.footerEmail.placeholder}
            className="artboard-input waitlist-artboard-footer-input"
            style={{
              left: page.footerEmail.left,
              top: page.footerEmail.top,
              width: page.footerEmail.width,
              height: page.footerEmail.height,
              fontFamily: fontSans,
            }}
          />
        )}

        {"cityPills" in page &&
          page.cityPills?.map((pill) => (
            <button
              key={pill.label}
              type="button"
              aria-label={pill.label}
              className="artboard-hit"
              style={{
                left: pill.left,
                top: pill.top,
                width: pill.width,
                height: pill.height,
              }}
            />
          ))}

        {"cityCards" in page &&
          page.cityCards?.map((card, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Select city ${i + 1}`}
              className="artboard-hit"
              style={{
                left: card.left,
                top: card.top,
                width: card.width,
                height: card.height,
              }}
            />
          ))}

        {"inputs" in page &&
          page.inputs?.map((field) => (
            <input
              key={field.id}
              id={field.id}
              name={field.id}
              type={field.type as "text" | "email" | "search" | "number"}
              aria-label={field.placeholder || field.id}
              className={
                "variant" in field && field.variant === "underline"
                  ? "waitlist-artboard-underline"
                  : "artboard-input waitlist-artboard-box-input"
              }
              style={{
                left: field.left,
                top: field.top,
                width: field.width,
                height: field.height,
                fontFamily: fontSans,
              }}
            />
          ))}

        {"schoolCard" in page && page.schoolCard && (
          <button
            type="button"
            aria-label="New York University"
            className="artboard-hit"
            style={{
              left: page.schoolCard.left,
              top: page.schoolCard.top,
              width: page.schoolCard.width,
              height: page.schoolCard.height,
            }}
          />
        )}

        {"notInSchool" in page && page.notInSchool && (
          <button
            type="button"
            aria-label="I'm not currently in school"
            className="artboard-hit"
            style={{
              left: page.notInSchool.left,
              top: page.notInSchool.top,
              width: page.notInSchool.width,
              height: page.notInSchool.height,
            }}
          />
        )}

        {"cta" in page && page.cta && (
          <Link
            href={page.cta.href}
            aria-label={page.cta.label}
            className="artboard-hit"
            style={{
              left: page.cta.left,
              top: page.cta.top,
              width: page.cta.width,
              height: page.cta.height,
            }}
          />
        )}

        {"secondaryLink" in page && page.secondaryLink && (
          <Link
            href={page.secondaryLink.href}
            aria-label={page.secondaryLink.label}
            className="artboard-hit"
            style={{
              left: page.secondaryLink.left,
              top: page.secondaryLink.top,
              width: page.secondaryLink.width,
              height: page.secondaryLink.height,
            }}
          />
        )}

        {"copyLink" in page && page.copyLink && (
          <button
            type="button"
            aria-label={page.copyLink.label}
            className="artboard-hit"
            style={{
              left: page.copyLink.left,
              top: page.copyLink.top,
              width: page.copyLink.width,
              height: page.copyLink.height,
            }}
          />
        )}

        {children}
      </div>
    </div>
  );
}
