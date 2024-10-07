import { useEffect, useRef } from "react";
import gsap from "gsap";

function Drawer({ isOpen, children }) {
  const drawerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(drawerRef.current, {
        x: "0%",
        duration: 1,
        ease: "power4.inOut",
      });
    } else {
      gsap.to(drawerRef.current, {
        x: "-100%",
        duration: 1,
        ease: "power4.inOut",
      });
    }
  }, [isOpen]);

  return (
    <aside
      ref={drawerRef}
      className="min-h-dvh w-full fixed pt-20 top-0 left-0 bg-transparent z-0"
      style={{ transform: "translateX(-100%)" }}
    >
      {children}
    </aside>
  );
}

export default Drawer;
