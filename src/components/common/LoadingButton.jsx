import { Button, Spinner } from "@material-tailwind/react";

export default function CustomButton({
  fullWidth,
  color,
  type,
  isLoading,
  text,
  className,
  ...rest
}) {
  return (
    <Button
      className={`rounded-none flex items-center justify-center h-12 text-sm font-semibold disabled:opacity-80 ${className}`}
      fullWidth={fullWidth}
      color={color}
      type={type}
      {...rest}
    >
      {isLoading ? <Spinner className="h-6 w-6" /> : text}
    </Button>
  );
}
