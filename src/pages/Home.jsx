import { WEBSITE } from "../config";
import background from "../assets/images/heroSection/background.jpg";

export default function Home() {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="min-h-dvh flex flex-col gap-[4dvh] px-4 py-[18dvh] transition-all duration-400 justify-center items-center text-center text-white bg-bgColor md:px-20 overflow-hidden"
      >
        <div className="w-full flex flex-col gap-[4dvh] justify-between items-center text-center md:text-center md:flex-row">
          <div className="w-full flex flex-col gap-[4dvh]">
            <h1
              style={{ fontSize: "clamp(3rem, 5vw, 3.5vw)" }}
              className="font-bold uppercase"
            >
              {WEBSITE.NAME}
            </h1>
            <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 1.8vw)" }}>
              Crafted with Confidence, Tailored for Success
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
