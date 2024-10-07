import { WEBSITE } from "../../config";
export default function Footer() {
  return (
    <>
      <footer className="min-h-fit bg-bgColor flex flex-col gap-10 px-4 py-12 justify-center items-center text-white md:flex-row md:px-16 ">
        <div>
          <h1
            style={{ fontSize: "clamp(1.2rem, 2vw, 1.2vw)" }}
            className="text-center"
          >
            © Copyright {WEBSITE.YEAR} {WEBSITE.NAME}
          </h1>
        </div>
      </footer>
    </>
  );
}
