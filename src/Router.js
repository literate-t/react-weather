import { Routes, Route } from 'react-router-dom';
import App from './App';
import Content from './Content';
import RealTime from './info/RealTime';
import FastExpect from './info/FastExpect';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="content" element={<Content />}>
        <Route path="real-time" element={<RealTime />} />
        <Route path="fast-expect" element={<FastExpect />} />
      </Route>
    </Routes>
  );
};
export default Router;
