/* eslint-disable no-return-await */
import { lazy, Suspense } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import GlobalFooter from './components/organisms/GlobalFooter';
import GlobalHeader from './components/organisms/GlobalHeader';

const IllustrationPage = lazy(async () => await import('./components/organisms/IllustrationPage'));
const About = lazy(async () => await import('./components/organisms/About'));
const PageNotFound = lazy(async () => await import('./components/organisms/404'));

function App() {
  const routes = [
    <Route key="illustration" path="/" element={<IllustrationPage />} />,
    <Route key="about" path="/about" element={<About />} />,
    <Route key="not_found" path="*" element={<PageNotFound />} />,
  ];

  return (
    <BrowserRouter basename="/">
      <GlobalHeader />
      <section className="py-6 px-4 sm:p-6 md:py-10 md:px-8">
        <Suspense fallback={<>Loading...</>}>
          <Routes>{routes}</Routes>
        </Suspense>
      </section>
      <GlobalFooter />
    </BrowserRouter>
  );
}

export default App;
