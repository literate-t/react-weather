import { Routes, Route } from 'react-router-dom';
import App from './App';
import Content from './Content';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="content" element={<Content />} />
    </Routes>
  );
};
export default Router;
