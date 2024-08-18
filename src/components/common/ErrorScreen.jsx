export default function ErrorScreen({ error }) {
  return (
    <section className="w-full h-[80vh] flex justify-center items-center bg-white/30 backdrop-blur-md">
      <span className="text-md text-red-500 font-medium block">{error}</span>
    </section>
  );
}
