function Button({
  children,
  type = 'button',
  variant = 'primary',
  disabled = false,
  onClick,
  className = '',
  ...buttonProps
}) {
  return (
    <button
      className={`button button--${variant} ${className}`.trim()}
      type={type}
      disabled={disabled}
      onClick={onClick}
      {...buttonProps}
    >
      {children}
    </button>
  )
}

export default Button
