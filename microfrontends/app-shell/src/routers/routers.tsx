import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import AngularWrapper from '../components/AngularWrapper';
import VueWrapper from '../components/VueWrapper';

const ReactApp = lazy(() => import('reactApp/App'));
const NextApp = lazy(() => import('login/Home'));

const Routers = () => {
  return (
    <Routes>
      <Route
        path="/react"
        element={
          <Suspense fallback={<div>Loading React App...</div>}>
            <ReactApp />
          </Suspense>
        }
      />
      <Route
        path="/vue"
        element={
          <Suspense fallback={<div>Loading Vue App...</div>}>
            <VueWrapper />
          </Suspense>
        }
      />
      <Route
        path="/angular"
        element={
          <Suspense fallback={<div>Loading Angular App...</div>}>
            <AngularWrapper />
          </Suspense>
        }
      />
      <Route
        path="/test"
        element={
          <Suspense fallback={<div>Loading Next App...</div>}>
            <NextApp />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default Routers;
