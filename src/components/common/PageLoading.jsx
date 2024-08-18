import { Spinner } from "@material-tailwind/react";

export default function PageLoading() {
  return (
    <section className="w-full h-[80vh] flex justify-center items-center bg-white/30 backdrop-blur-md">
      <Spinner className="h-8 w-8" />
    </section>
  );
}
