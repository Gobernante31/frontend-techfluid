import { VerificationStatus } from "../model/verification-status";
import { verificationStatusLabels } from "../model/verification-status-labels";
import { verificationStatusBadgeStyles } from "../styles/VerificationStatusBadge.styles";

type VerificationStatusValue =
  (typeof VerificationStatus)[keyof typeof VerificationStatus];

export function VerificationStatusBadge({
  status,
}: {
  readonly status: VerificationStatusValue;
}) {
  return (
    <span
      className={`${verificationStatusBadgeStyles.base} ${verificationStatusBadgeStyles.status[status]}`}
    >
      {verificationStatusLabels[status]}
    </span>
  );
}
