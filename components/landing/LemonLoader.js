import Script from "next/script";
import { useEffect, useState } from "react";
export default function LemonLoader() {
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      window.createLemonSqueezy();
    }
  }, [isLoaded]);

  return (
    <Script
      src="https://assets.lemonsqueezy.com/lemon.js"
      onLoad={() => setLoaded(true)}
    />
  );
}
