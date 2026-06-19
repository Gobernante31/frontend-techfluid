import { VerificationStatus } from "./verification-status";

type VerificationStatusValue =
  (typeof VerificationStatus)[keyof typeof VerificationStatus];

export type Verification = {
  id: string;
  name: string;
  email: string;
  documentNumber: string;
  selfieImage?: string;
  documentImage?: string;
  status: VerificationStatusValue;
  createdAt?: string;
  updatedAt?: string;
};
