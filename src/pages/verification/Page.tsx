import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { VerificationForm } from "./components/VerificationForm";
import { VerificationStatusPanel } from "./components/VerificationStatusPanel";
import { useVerification } from "./hooks/use-verification";
import { verificationPageStyles } from "./styles/VerificationPage.styles";

export function VerificationPage() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored === "dark") return true;
      if (stored === "light") return false;
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });
  const verificationState = useVerification();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <main className={verificationPageStyles.page}>
      <div className={verificationPageStyles.wrapper}>
        <header className={verificationPageStyles.header}>
          <div>
            <p className={verificationPageStyles.brand}>Tech Fluid</p>
            <h1 className={verificationPageStyles.title}>
              Validaci&oacute;n de identidad
            </h1>
          </div>
          <button
            className={verificationPageStyles.themeButton}
            onClick={() => setIsDarkMode((currentValue) => !currentValue)}
            title={isDarkMode ? "Modo claro" : "Modo oscuro"}
            type="button"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>

        <section className={verificationPageStyles.layout}>
          <VerificationForm
            errorMessage={verificationState.errorMessage}
            form={verificationState.form}
            isSubmitting={verificationState.isSubmitting}
            errors={verificationState.errors}
            onChange={verificationState.setForm}
            onSubmit={verificationState.handleSubmit}
            onFieldBlur={verificationState.onFieldBlur}
            successMessage={verificationState.successMessage}
          />
          <VerificationStatusPanel
            isRefreshing={verificationState.isRefreshing}
            onRefresh={() =>
              void verificationState.refreshCurrentVerification()
            }
            verification={verificationState.verification}
          />
        </section>
      </div>
    </main>
  );
}
