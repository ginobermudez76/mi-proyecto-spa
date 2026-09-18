interface GoogleIconProps {
  name: string;
  className?: string;
  size?: number | string;
  filled?: boolean;
}

export const GoogleIcon = ({
  name,
  className = '',
  size,
  filled = false,
}: GoogleIconProps) => {
  return (
    <span
      className={`material-symbols-outlined select-none inline-flex items-center justify-center leading-none ${className}`}
      style={{
        fontSize: size ? (typeof size === 'number' ? `${size}px` : size) : undefined,
        fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0",
      }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
};

export default GoogleIcon;
