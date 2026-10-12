import { Link } from 'react-router-dom';

const styles = {
  primary: 'bg-brand text-white hover:brightness-95',
  secondary: 'bg-white text-brand-dark border border-line hover:bg-brand-soft',
};

export default function Button({ to, href, variant = 'primary', className = '', children, ...rest }) {
  const cls = `inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition-colors ${styles[variant]} ${className}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>;
  return <button className={cls} {...rest}>{children}</button>;
}
