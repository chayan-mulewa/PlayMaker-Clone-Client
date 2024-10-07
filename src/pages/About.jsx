import { WEBSITE } from "../config";

export default function About() {
  return (
    <main className="flex flex-col overflow-hidden">
      <section className="min-h-dvh flex flex-col gap-[10dvh] px-4 py-[20dvh] justify-center items-center text-center text-balance bg-bgColor text-white md:px-20 transition-all duration-400">
        <div className="">
          <h1
            style={{ fontSize: "clamp(2.5rem, 5vw, 3vw)" }}
            className="uppercase"
          >
            ABOUT US
          </h1>
        </div>
        <div>
          <p
            style={{ fontSize: "clamp(1.25rem, 5vw, 1.5vw)" }}
            className="text-balance"
          >
            With a legacy spanning over three decades in the art of custom
            craftsmanship, our journey recently acquired a name, {WEBSITE.NAME}.
            In this brief yet intense period, our singular focus has been
            nothing short of transformative: we've embarked on a mission to
            forge a global brand, one that tears down the barriers to luxury and
            invites everyone to experience the allure of a prestige item,
            specifically tailored apparel.
          </p>
        </div>
      </section>
      <section className="min-h-dvh flex flex-col gap-[10dvh] px-4 py-[20dvh] justify-center items-center text-center text-balance bg-white text-black md:px-20 transition-all duration-400">
        <div className="">
          <h1
            style={{ fontSize: "clamp(2.5rem, 5vw, 3vw)" }}
            className="uppercase"
          >
            B2B BUSINESS TO BUSINESS
          </h1>
        </div>
        <div>
          <p
            style={{ fontSize: "clamp(1.25rem, 5vw, 1.5vw)" }}
            className="text-balance"
          >
            At {WEBSITE.NAME} Bespoke, we extend our expertise beyond individual
            orders. We're pleased to offer Business to Business (B2B)
            manufacturing services, catering to establishments seeking tailored
            solutions for uniforms and more. Our commitment to precision and
            quality craftsmanship is now available for your business needs.
          </p>
        </div>
      </section>
      <section className="min-h-dvh flex flex-col gap-[10dvh] px-4 py-[20dvh] justify-center items-center text-center text-balance bg-bgColor text-white md:px-20 transition-all duration-400">
        <div className="">
          <h1
            style={{ fontSize: "clamp(2.5rem, 5vw, 3vw)" }}
            className="uppercase"
          >
            WHY CHOOSE US ?
          </h1>
        </div>
        <div>
          <p
            style={{ fontSize: "clamp(1.25rem, 5vw, 1.5vw)" }}
            className="text-balance"
          >
            Choose us to experience the zenith of bespoke luxury. Our unwavering
            dedication to unparalleled quality, innovative service, and
            competitive prices distinguishes us as the premium choice. Elevate
            your style with the best in the business, {WEBSITE.NAME}.
          </p>
        </div>
      </section>
    </main>
  );
}
