import { VerificationStatus } from "../model/verification-status";

type VerificationStatusValue =
  (typeof VerificationStatus)[keyof typeof VerificationStatus];

export const verificationStatusBadgeStyles = {
  base: "rounded-md px-2.5 py-1 text-xs font-semibold",
  status: {
    [VerificationStatus.Pending]:
      "bg-amber-100 text-amber-800 dark:bg-amber-400/15 dark:text-amber-200",
    [VerificationStatus.Approved]:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-200",
    [VerificationStatus.Rejected]:
      "bg-rose-100 text-rose-800 dark:bg-rose-400/15 dark:text-rose-200",
  } satisfies Record<VerificationStatusValue, string>,
};
