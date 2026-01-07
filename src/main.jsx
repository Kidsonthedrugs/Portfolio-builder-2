import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // این خط را بعدا اضافه می‌کنیم

function App() {
  return (
    <div className="bg-blue-900 text-white min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">
        سلام دنیا! سایت من کار می‌کند!
      </h1>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
