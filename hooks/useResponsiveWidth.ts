import { useEffect, useState, RefObject } from 'react';

export default function useResponsiveWidth(
  ref: RefObject<HTMLElement | SVGSVGElement | null>,
  width: number | string,
  defaultWidth: number = 1000
) {
  const [measuredWidth, setMeasuredWidth] = useState<number>(
    typeof width === 'number' ? width : defaultWidth
  );

  useEffect(() => {
    if (ref.current) {
      const handleResize = () => {
        if (ref.current) {
          setMeasuredWidth(ref.current.clientWidth);
        }
      };

      const observer = new window.ResizeObserver(handleResize);
      observer.observe(ref.current);

      handleResize();

      return () => {
        observer.disconnect();
      };
    }
  }, [width, ref]);

  return typeof width === 'number' ? width : measuredWidth;
}
