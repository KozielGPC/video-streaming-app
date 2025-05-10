import React, { useEffect, useRef, useState } from 'react';
import { createApp } from 'vue';

const VueWrapper: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [VueComponent, setVueComponent] = useState<any>(null);

  useEffect(() => {
    if (containerRef.current && VueComponent) {
      const app = createApp(VueComponent);
      app.mount(containerRef.current);

      return () => {
        app.unmount();
      };
    }
  }, [VueComponent]);

  useEffect(() => {
    import('vueApp/App').then((module) => {
      setVueComponent(module.default);
    });
  }, []);

  if (!VueComponent) {
    return null;
  }

  return <div ref={containerRef} />;
};

export default VueWrapper;
