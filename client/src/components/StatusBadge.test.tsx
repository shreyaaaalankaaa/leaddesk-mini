import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StatusBadge } from './StatusBadge';

describe('StatusBadge', () => {
  it('renders the human-readable status', () => {
    render(<StatusBadge status="contacted" />);
    expect(screen.getByText('Contacted')).toBeInTheDocument();
  });
});
