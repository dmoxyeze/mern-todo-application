import { RefObject, useEffect } from "react";

type Event = MouseEvent | TouchEvent;
const useClickOutside = <T extends HTMLDivElement = HTMLDivElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void
) => {
  const listener = (event: Event) => {
    const el = ref?.current;
    if (!el || ref?.current.contains(<Node>event!.target)) {
      return;
    }
    handler(event); // Call the handler only if the click is outside of the element passed.
  };
  useEffect(() => {
    document.addEventListener("click", listener);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
};

export default useClickOutside;
