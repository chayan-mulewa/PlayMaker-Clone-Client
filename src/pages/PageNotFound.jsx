export default function PageNotFound() {
  return (
    <main className="min-h-dvh flex flex-col justify-center items-center gap-[1dvh]  bg-bgColor text-white overflow-hidden">
      <h1 style={{ fontSize: "clamp(2rem, 10vw, 3vw)" }}>404</h1>
      <h1 style={{ fontSize: "clamp(2rem, 10vw, 2vw)" }}>
        This page does not exist.
      </h1>
    </main>
  );
}
