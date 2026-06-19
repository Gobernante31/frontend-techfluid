export const imageDropzoneStyles = {
  emptyState:
    "flex flex-col items-center gap-2 px-4 text-center text-neutral-500 dark:text-neutral-400",
  field: "sr-only",
  image: "h-full w-full object-cover",
  label: "text-sm font-semibold text-neutral-700 dark:text-neutral-200",
  removeButton:
    "absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/90 text-neutral-700 shadow-sm hover:bg-white dark:bg-neutral-950/90 dark:text-neutral-100",
  root: "space-y-2",
  text: "text-sm",
  zone: "relative flex aspect-[4/3] cursor-pointer items-center justify-center overflow-hidden rounded-md border border-dashed transition",
  zoneDragging:
    "border-neutral-950 bg-neutral-100 dark:border-white dark:bg-neutral-800",
  zoneIdle:
    "border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-950",
  zoneError: "border-red-600 bg-red-50 dark:border-red-500 dark:bg-red-900/10",
};
