import '~/global.css';

import { NextUIProvider } from '@nextui-org/react';
import ReactDOM from 'react-dom/client';

import App from '~/app';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <NextUIProvider>
    <App />
  </NextUIProvider>,
);
