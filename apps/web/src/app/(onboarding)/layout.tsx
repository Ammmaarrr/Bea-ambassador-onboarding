/** Shared wrapper for ambassador onboarding routes — CSS loads via root globals.css */
export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return <div className="onboarding-artboard-root">{children}</div>;
}
