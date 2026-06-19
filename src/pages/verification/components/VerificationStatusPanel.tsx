import { CheckCircle2, RefreshCw, ShieldCheck } from "lucide-react";
import { Button } from "../../../shared/components/Button";
import type { Verification } from "../model/verification";
import { verificationStatusPanelStyles } from "../styles/VerificationStatusPanel.styles";
import { VerificationStatusBadge } from "./VerificationStatusBadge";

type VerificationStatusPanelProps = {
  readonly isRefreshing: boolean;
  readonly verification?: Verification;
  readonly onRefresh: () => void;
};

export function VerificationStatusPanel({
  isRefreshing,
  onRefresh,
  verification,
}: VerificationStatusPanelProps) {
  return (
    <aside className={verificationStatusPanelStyles.panel}>
      <div className={verificationStatusPanelStyles.header}>
        <h2 className={verificationStatusPanelStyles.title}>
          Estado validaci&oacute;n
        </h2>
        {verification ? (
          <VerificationStatusBadge status={verification.status} />
        ) : null}
      </div>

      {verification ? (
        <div className={verificationStatusPanelStyles.body}>
          <div className={verificationStatusPanelStyles.registered}>
            <CheckCircle2 size={18} />
            <span>Solicitud registrada</span>
          </div>
          <dl className={verificationStatusPanelStyles.detailList}>
            <dt>Nombre</dt>
            <dd className={verificationStatusPanelStyles.name}>
              {verification.name}
            </dd>
            <dt>Email</dt>
            <dd>{verification.email}</dd>
            <dt>Documento</dt>
            <dd>{verification.documentNumber}</dd>
            <dt>ID</dt>
            <dd className={verificationStatusPanelStyles.id}>
              {verification.id}
            </dd>
          </dl>
          <Button
            disabled={isRefreshing}
            icon={
              <RefreshCw
                className={
                  isRefreshing ? verificationStatusPanelStyles.spinner : ""
                }
                size={18}
              />
            }
            onClick={onRefresh}
            type="button"
            variant="secondary"
          >
            Actualizar estado
          </Button>
        </div>
      ) : (
        <div className={verificationStatusPanelStyles.emptyState}>
          <ShieldCheck
            className={verificationStatusPanelStyles.emptyStateIcon}
            size={34}
          />
          <p className={verificationStatusPanelStyles.emptyStateText}>
            Completa el formulario para iniciar la validaci&oacute;n.
          </p>
        </div>
      )}
    </aside>
  );
}
