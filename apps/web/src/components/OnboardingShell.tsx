type Props = {
  children: React.ReactNode;
};

/** @deprecated Layout wrapper lives in app/(onboarding)/layout.tsx */
export function OnboardingShell({ children }: Props) {
  return <>{children}</>;
}
