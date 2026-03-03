import React, { forwardRef } from 'react';
import { cn } from '../utils/cn';

/** Responsive table wrapper with horizontal scroll overflow. */
export const Table = forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="w-full overflow-auto">
      <table ref={ref} className={cn('w-full caption-bottom text-sm border-collapse', className)} {...props} />
    </div>
  ),
);
Table.displayName = 'Table';

/** Renders the `<thead>` section with subtle glass background and bottom border on rows. */
export const TableHeader = forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn('[&_tr]:border-b [&_tr]:bg-[var(--gray-50)]', className)} {...props} />
  ),
);
TableHeader.displayName = 'TableHeader';

/** Renders the `<tbody>` section, removing the border from the last row. */
export const TableBody = forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />,
);
TableBody.displayName = 'TableBody';

/** Renders the `<tfoot>` section with a top border and secondary background. */
export const TableFooter = forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <tfoot ref={ref} className={cn('border-t border-solid border-[var(--border)] bg-[var(--muted)] font-medium [&_td]:py-3 [&_td]:align-middle [&_th]:py-3 [&_th]:align-middle', className)} {...props} />,
);
TableFooter.displayName = 'TableFooter';

/** Renders a `<tr>` with glass hover highlight and selected state styling. */
export const TableRow = forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, style, ...props }, ref) => (
    <tr
      ref={ref}
      style={{
        transition: 'background-color 220ms cubic-bezier(0.22, 1, 0.36, 1), color 220ms cubic-bezier(0.22, 1, 0.36, 1)',
        ...style,
      }}
      className={cn(
        'border-b border-solid border-[var(--border)]',
        'hover:bg-[var(--interactive-hover)] data-[state=selected]:bg-[var(--point-subtle)]',
        className,
      )}
      {...props}
    />
  ),
);
TableRow.displayName = 'TableRow';

/** Renders a `<th>` header cell with muted foreground text and medium font weight. */
export const TableHead = forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th ref={ref} scope="col" className={cn('h-10 px-4 text-left align-middle font-medium text-[var(--muted-foreground)] [&:has([role=checkbox])]:pr-0', className)} {...props} />
  ),
);
TableHead.displayName = 'TableHead';

/** Renders a `<td>` data cell with standard padding and middle alignment. */
export const TableCell = forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn('px-4 py-3 align-middle [&:has([role=checkbox])]:pr-0', className)} {...props} />
  ),
);
TableCell.displayName = 'TableCell';

/** Renders a `<caption>` with muted foreground text positioned below the table. */
export const TableCaption = forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn('mt-4 mb-2 text-sm text-[var(--muted-foreground)]', className)} {...props} />
  ),
);
TableCaption.displayName = 'TableCaption';
