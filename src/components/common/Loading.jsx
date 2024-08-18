import { Spinner } from "@material-tailwind/react";

export default function Loading() {
  return (
    <section className="h-screen w-full fixed top-0 z-50 left-0 flex justify-center items-center bg-white/30 backdrop-blur-md">
      <Spinner className="h-10 w-10" />
    </section>
  );
}
