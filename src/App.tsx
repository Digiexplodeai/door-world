import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/Layout';
import { CustomCursor } from './components/CustomCursor';
import { HomePage } from './pages/HomePage';
import { KitchensPage } from './pages/KitchensPage';
import { DoorsPage } from './pages/DoorsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <CustomCursor />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="kitchen" element={<KitchensPage />} />
            <Route path="kitchens" element={<Navigate to="/kitchen" replace />} />
            <Route path="doors" element={<DoorsPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="inquiry" element={<Navigate to="/contact" replace />} />
            <Route path="services" element={<Navigate to="/kitchen" replace />} />
            <Route path="gallery" element={<Navigate to="/doors" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export { App };
