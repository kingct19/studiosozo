import Link from "next/link";
import { cn } from "cn";

type LitUpButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

export function LitUpButton({
  children,
  className,
  href,
  type = "button",
  disabled,
  onClick,
}: LitUpButtonProps) {
  const classes = cn(
    "group relative inline-flex p-[3px] disabled:pointer-events-none disabled:opacity-50",
    className,
  );
  const content = (
    <>
      <span className="absolute inset-0 rounded-lg bg-[linear-gradient(90deg,hsla(47,100%,87%,1)_0%,hsla(334,81%,60%,1)_50%,hsla(237,64%,56%,1)_100%)]" />
      <span className="relative inline-flex w-full items-center justify-center gap-2 rounded-[6px] bg-black px-8 py-2 text-center text-white transition duration-200 group-hover:bg-transparent group-hover:text-[#0a2540]">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
    >
      {content}
    </button>
  );
}
