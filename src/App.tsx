import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { DocsLayout } from './pages/DocsLayout';
import { DocPage } from './pages/DocPage';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/docs" element={<DocsLayout />}>
          <Route index element={<Navigate to="/" replace />} />
          <Route path="*" element={<DocPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
