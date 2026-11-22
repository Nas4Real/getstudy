/// <reference types="vite/client" />

import 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'iconify-icon': any;
    }
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'iconify-icon': any;
    }
  }
}
