export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(
    date,
  );
}

export function formatMonthYear(date: Date): string {
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short' }).format(date);
}

/** Tiny class-name joiner: avoids pulling in clsx for a one-line job. */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
