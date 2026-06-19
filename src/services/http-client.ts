import { apiBaseUrl } from "../config/api-config";
import type { ApiErrorResponse } from "../domain/api-error-response";

export async function requestApi<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init.headers,
      },
    });
  } catch (err) {
    // Network error or CORS issue
    // Log the original error to help debugging in dev
    // eslint-disable-next-line no-console
    console.error(`[requestApi] fetch error for ${apiBaseUrl}${path}`, err);
    throw new Error(
      "No fue posible conectar con el servidor. Verifica tu conexión o intenta más tarde.",
    );
  }

  // Try to parse JSON only if content-type indicates JSON
  const contentType = response.headers.get("content-type") ?? "";
  let payload: unknown = null;
  if (contentType.includes("application/json")) {
    try {
      payload = await response.json();
    } catch (e) {
      payload = null;
    }
  }

  if (!response.ok) {
    const errorResponse = (payload as ApiErrorResponse) ?? null;
    // Log server error details for debugging
    // eslint-disable-next-line no-console
    console.error(
      `[requestApi] server error ${response.status} ${apiBaseUrl}${path}`,
      {
        status: response.status,
        payload: errorResponse,
      },
    );
    throw new Error(
      errorResponse?.error?.message ??
        "No fue posible completar la solicitud. Intenta de nuevo más tarde.",
    );
  }

  return payload as T;
}
