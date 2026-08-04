type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
};

export function Button({ children, href, onClick, variant = 'primary' }: ButtonProps) {
  const className = `button button-${variant}`;

  if (href) {
    const isExternal = href.startsWith('http');

    return (
      <a
        href={href}
        className={className}
        rel={isExternal ? 'noreferrer' : undefined}
        target={isExternal ? '_blank' : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}
