import { ImagePlus, X } from "lucide-react";
import { useId, useState } from "react";
import { imageDropzoneStyles } from "./ImageDropzone.styles";

type ImageDropzoneProps = {
  readonly label: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly error?: string | boolean;
};

export function ImageDropzone({
  label,
  value,
  onChange,
  error,
}: ImageDropzoneProps) {
  const inputId = useId();
  const [isDragging, setIsDragging] = useState(false);

  function handleFile(file?: File) {
    if (!file?.type?.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className={imageDropzoneStyles.root}>
      <label className={imageDropzoneStyles.label} htmlFor={inputId}>
        {label}
      </label>
      <label
        className={`${imageDropzoneStyles.zone} ${isDragging ? imageDropzoneStyles.zoneDragging : imageDropzoneStyles.zoneIdle} ${
          error ? imageDropzoneStyles.zoneError : ""
        }`}
        htmlFor={inputId}
        onDragEnter={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          handleFile(event.dataTransfer.files[0]);
        }}
      >
        {value ? (
          <>
            <img
              alt={label}
              className={imageDropzoneStyles.image}
              src={value}
            />
            <button
              className={imageDropzoneStyles.removeButton}
              onClick={(event) => {
                event.preventDefault();
                onChange("");
              }}
              title="Quitar imagen"
              type="button"
            >
              <X size={18} />
            </button>
          </>
        ) : (
          <div className={imageDropzoneStyles.emptyState}>
            <ImagePlus size={28} />
            <span className={imageDropzoneStyles.text}>
              Arrastra una imagen o selecciona un archivo
            </span>
          </div>
        )}
      </label>
      {error ? (
        <p className="mt-1 text-sm text-red-600">
          {typeof error === "string" ? error : "Campo requerido"}
        </p>
      ) : null}
      <input
        accept="image/png,image/jpeg,image/webp"
        className={imageDropzoneStyles.field}
        id={inputId}
        onChange={(event) => handleFile(event.target.files?.[0])}
        type="file"
      />
    </div>
  );
}
