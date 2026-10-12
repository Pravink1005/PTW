import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';
import { useDialogFocus } from '../src/components/admin/AdminUI';

function DialogHarness() {
  const [open, setOpen] = useState(false);
  const dialogRef = useDialogFocus(open, () => setOpen(false));
  return <>
    <button type="button" onClick={() => setOpen(true)}>Open dialog</button>
    {open && <section ref={dialogRef} role="dialog" aria-label="Example dialog" tabIndex={-1}>
      <button type="button">First action</button>
      <button type="button">Last action</button>
    </section>}
  </>;
}

describe('admin dialog keyboard behavior', () => {
  it('moves focus into the dialog, traps Tab, closes on Escape and restores focus', () => {
    render(<DialogHarness />);
    const opener = screen.getByRole('button', { name: 'Open dialog' });
    opener.focus();
    fireEvent.click(opener);
    const first = screen.getByRole('button', { name: 'First action' });
    const last = screen.getByRole('button', { name: 'Last action' });
    expect(first).toHaveFocus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(last).toHaveFocus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(first).toHaveFocus();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
  });
});