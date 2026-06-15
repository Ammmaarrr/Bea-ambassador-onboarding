import type { LoginConfig } from "@/lib/config";

export type LoginPayload = {
  email: string;
  password: string;
  remember: boolean;
};

export type AuthResponse = {
  ok: boolean;
  message?: string;
  token?: string;
  user?: { email: string; name?: string };
  redirectTo?: string;
};

export type SocialPayload = {
  provider: "google" | "apple";
};

function resolveEndpoint(config: LoginConfig["api"], key: "login" | "google" | "apple"): string {
  const path = config[key];
  if (config.useExternalBackend && config.externalBaseUrl) {
    return `${config.externalBaseUrl.replace(/\/$/, "")}${path}`;
  }
  return path;
}

export async function loginRequest(
  config: LoginConfig["api"],
  payload: LoginPayload,
): Promise<AuthResponse> {
  const res = await fetch(resolveEndpoint(config, "login"), {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
    credentials: "include",
  });

  const data = (await res.json()) as AuthResponse;
  if (!res.ok) {
    throw new Error(data.message ?? "Login failed");
  }
  return data;
}

export async function socialAuthRequest(
  config: LoginConfig["api"],
  payload: SocialPayload,
): Promise<AuthResponse> {
  const endpoint = payload.provider === "google" ? config.google : config.apple;
  const url =
    config.useExternalBackend && config.externalBaseUrl
      ? `${config.externalBaseUrl.replace(/\/$/, "")}${endpoint}`
      : endpoint;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
    credentials: "include",
  });

  const data = (await res.json()) as AuthResponse;
  if (!res.ok) {
    throw new Error(data.message ?? "Social sign-in failed");
  }
  return data;
}
