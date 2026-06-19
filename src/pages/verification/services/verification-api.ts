import { requestApi } from "../../../services/http-client";
import type { CreateVerificationPayload } from "../model/create-verification-payload";
import type { Verification } from "../model/verification";

export const verificationApi = {
  create(payload: CreateVerificationPayload): Promise<Verification> {
    return requestApi<Verification>("/verification", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  findById(id: string): Promise<Verification> {
    return requestApi<Verification>(`/verification/${id}`);
  },
};
