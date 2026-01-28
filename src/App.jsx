import React, { useState } from 'react';
import { businessData } from '../data';

const Icons = {
  menu: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>,
  star: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
  cart: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  info: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
};

export default function App() {
  const [activeTabId, setActiveTabId] = useState(businessData.tabs[0].id);
  const [cart, setCart] = useState([]);

  // --- FUNCIONES DEL CARRITO ---
  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.title === product.title);
      if (exists) {
        return prev.map(item => item.title === product.title 
          ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productTitle) => {
    setCart(prev => prev.filter(item => item.title !== productTitle));
  };

  const updateQuantity = (title, delta) => {
    setCart(prev => prev.map(item => {
      if (item.title === title) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const activeContent = businessData.tabs.find(t => t.id === activeTabId);

  const sendWhatsApp = () => {
  // 1. Calculamos el total
  const total = cart.reduce((acc, item) => {
    // Limpiamos el precio (quitamos $ y puntos) para sumar
    const priceNum = parseInt(item.price.replace(/[^0-9]/g, ''));
    return acc + (priceNum * item.quantity);
  }, 0);

  // 2. Formateamos la lista de productos
  const itemsText = cart.map(item => 
    `- ${item.quantity}x ${item.title} (${item.price} c/u)`
  ).join('\n');

  // 3. Armamos el mensaje final
  const message = `¡Hola! 👋 Vengo de la web y quiero hacer un pedido:\n\n${itemsText}\n\n*Total estimado: $${total.toLocaleString('es-AR')}*\n\n¿Me confirman el pedido?`;

  // 4. Codificamos el mensaje para URL
  const encodedMessage = encodeURIComponent(message);
  
  // 5. Abrimos WhatsApp
  window.open(`https://wa.me/${businessData.phone}?text=${encodedMessage}`, '_blank');
};

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-0 sm:p-4 font-sans text-slate-900">
      <div className="w-full max-w-md bg-white h-screen sm:h-[85vh] sm:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col relative border border-slate-200">
        
        {/* HEADER */}
        <header className="pt-8 pb-4 px-6 text-center border-b border-slate-50">
          <img src={businessData.logo} alt="Logo" className="w-16 h-16 mx-auto mb-2 object-contain" />
          <h1 className="text-xl font-black uppercase tracking-tight">{businessData.name}</h1>
        </header>

        {/* CONTENIDO */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* VISTA DEL CARRITO (Si la tab activa es 'cart') */}
          {activeTabId === 'cart' ? (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-lg font-bold mb-4">Tu Pedido</h2>
              {cart.length === 0 ? (
                <p className="text-slate-400 text-center py-10">El carrito está vacío</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, i) => (
                    <div key={i} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl">
                      <div className="flex-1">
                        <h3 className="font-bold text-sm">{item.title}</h3>
                        <p className="text-xs text-blue-600 font-bold">{item.price}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateQuantity(item.title, -1)} className="w-8 h-8 rounded-full bg-white border shadow-sm">-</button>
                        <span className="font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.title, 1)} className="w-8 h-8 rounded-full bg-white border shadow-sm">+</button>
                        <button onClick={() => removeFromCart(item.title)} className="ml-2 text-red-500">🗑️</button>
                      </div>
                    </div>
                  ))}
                  <button 
                    onClick={sendWhatsApp}
                    className="w-full py-4 rounded-2xl font-bold text-white mt-4 shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
                    style={{ backgroundColor: businessData.themeColor }}
                  >
                    <span>Confirmar Pedido por WhatsApp</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.886.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884 0 2.225.569 3.967 1.582 5.654l-.999 3.648 3.906-.97z" />
                    </svg>
                </button>
                </div>
              )}
            </div>
          ) : (
            /* VISTA DE LISTA / TEXTO */
            <div className="animate-in fade-in duration-300">
              <h2 className="text-xs font-bold uppercase tracking-widest mb-6 opacity-40">{activeContent.label}</h2>
              {activeContent.type === 'list' ? (
                <div className="space-y-6">
                  {activeContent.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-start border-b border-slate-50 pb-4">
                      <div className="flex-1 pr-4">
                        <h3 className="font-bold text-slate-800">{item.title}</h3>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                        <p className="text-sm font-bold mt-1" style={{ color: businessData.themeColor }}>{item.price}</p>
                      </div>
                      <button 
                        onClick={() => addToCart(item)}
                        className="bg-slate-900 text-white p-2 rounded-xl active:scale-90 transition-transform"
                      >
                        <Icons.cart />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-slate-50 p-5 rounded-2xl text-sm whitespace-pre-line">{activeContent.content}</div>
              )}
            </div>
          )}
        </main>

        {/* NAVEGACIÓN INFERIOR */}
        <nav className="p-4 bg-white/80 backdrop-blur-md border-t border-slate-100">
          <div className="flex justify-around items-center">
            {businessData.tabs.map((tab) => {
              const isActive = activeTabId === tab.id;
              const Icon = Icons[tab.icon];
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`relative flex flex-col items-center p-2 transition-all ${isActive ? 'scale-110 opacity-100' : 'opacity-40'}`}
                  style={{ color: isActive ? businessData.themeColor : 'inherit' }}
                >
                  <Icon />
                  {tab.id === 'cart' && cart.length > 0 && (
                    <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                      {cart.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                  )}
                  <span className="text-[10px] font-bold mt-1 uppercase">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}