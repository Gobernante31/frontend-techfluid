import { VerificationStatus } from "./verification-status";

type VerificationStatusValue =
  (typeof VerificationStatus)[keyof typeof VerificationStatus];

export const verificationStatusLabels: Record<VerificationStatusValue, string> =
  {
    [VerificationStatus.Pending]: "Pendiente",
    [VerificationStatus.Approved]: "Aprobado",
    [VerificationStatus.Rejected]: "Rechazado",
  };
