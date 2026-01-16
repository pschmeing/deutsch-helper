import { useCallback, useEffect, useRef } from "react";
import VanillaTilt, { HTMLVanillaTiltElement, TiltOptions } from "vanilla-tilt";

const useVanillaTilt = (options: TiltOptions) => {
  const tiltNodes = useRef<HTMLVanillaTiltElement[]>([]);

  const setTiltRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const element = node as HTMLVanillaTiltElement;

    if (!tiltNodes.current.includes(element)) {
      tiltNodes.current.push(element);
    }
  }, []);

  useEffect(() => {
    if (!tiltNodes.current.length) return;

    VanillaTilt.init(tiltNodes.current, options);

    return () => {
      tiltNodes.current.forEach((node) => {
        node.vanillaTilt?.destroy();
      });
    };
  }, [options]);

  return setTiltRef;
};

export default useVanillaTilt;
