import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast';

export default function Admin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({ title: '', desc: '', price: '', category: 'precios' });

  // Escuchar si el usuario está logueado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) fetchProductos();
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const fetchProductos = async () => {
    const querySnapshot = await getDocs(collection(db, "productos"));
    const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProductos(docs);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("¡Bienvenido al panel!");
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.title || !newProduct.price) return toast.error("Título y precio son obligatorios");

    try {
      await addDoc(collection(db, "productos"), newProduct);
      setNewProduct({ title: '', desc: '', price: '', category: 'precios' }); // Limpiar form
      fetchProductos();
      toast.success("Producto agregado correctamente");
    } catch (error) {
      toast.error("Error al agregar");
    }
  };

  const handleUpdatePrice = async (id, newPrice) => {
    try {
      const productRef = doc(db, "productos", id);
      await updateDoc(productRef, { price: newPrice });
      toast.success("Precio actualizado");
    } catch (error) {
      toast.error("Error al actualizar");
    }
  };

  // ELIMINAR PRODUCTO
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await deleteDoc(doc(db, "productos", id));
        fetchProductos();
        toast.success("Producto eliminado");
      } catch (error) {
        toast.error("Error al eliminar");
      }
    }
  };

  if (loading) return <div className="p-10 text-center">Cargando...</div>;

  // VISTA DE LOGIN
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <Toaster /> {/* El contenedor de los avisos */}
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-sm">
          <h2 className="text-2xl font-black mb-6 uppercase">Panel Admin</h2>
          <input type="email" placeholder="Email" className="w-full p-3 border rounded-xl mb-4" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Contraseña" className="w-full p-3 border rounded-xl mb-6" onChange={(e) => setPassword(e.target.value)} />
          <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold uppercase tracking-widest">Entrar</button>
        </form>
      </div>
    );
  }

  // VISTA DE ADMINISTRACIÓN
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <Toaster position="top-right" /> {/* El contenedor de los avisos */}
      
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Gestión de Catálogo</h1>
          <button onClick={() => signOut(auth)} className="text-red-500 font-bold bg-red-50 px-4 py-2 rounded-xl">Cerrar Sesión</button>
        </div>

        {/* FORMULARIO PARA AGREGAR */}
        <div className="bg-white p-6 rounded-3xl shadow-sm mb-8 border border-slate-200">
          <h2 className="text-lg font-bold mb-4">Añadir Nuevo Producto</h2>
          <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" placeholder="Título (ej: Martillo)" 
              value={newProduct.title}
              className="p-3 border rounded-xl"
              onChange={e => setNewProduct({...newProduct, title: e.target.value})}
            />
            <input 
              type="text" placeholder="Precio (ej: $5000)" 
              value={newProduct.price}
              className="p-3 border rounded-xl"
              onChange={e => setNewProduct({...newProduct, price: e.target.value})}
            />
            <input 
              type="text" placeholder="Descripción corta" 
              value={newProduct.desc}
              className="p-3 border rounded-xl"
              onChange={e => setNewProduct({...newProduct, desc: e.target.value})}
            />
            <select 
              className="p-3 border rounded-xl bg-white"
              value={newProduct.category}
              onChange={e => setNewProduct({...newProduct, category: e.target.value})}
            >
              <option value="precios">Lista de Precios</option>
              <option value="promos">Promociones</option>
              <option value="info">Información</option>
            </select>
            <button className="md:col-span-2 bg-blue-600 text-white py-3 rounded-xl font-bold">Agregar al Catálogo</button>
          </form>
        </div>

        {/* LISTA DE PRODUCTOS EXISTENTES */}
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-slate-200">
          <div className="p-4 bg-slate-100 text-xs font-bold text-slate-500 uppercase tracking-widest">Productos Actuales</div>
          {productos.map(product => (
            <div key={product.id} className="p-4 border-b flex flex-wrap justify-between items-center gap-4 hover:bg-slate-50 transition-colors">
              <div className="flex-1 min-w-[200px]">
                <p className="font-bold text-slate-800">{product.title}</p>
                <p className="text-xs text-slate-400">{product.category} • {product.desc}</p>
              </div>
              <div className="flex items-center gap-4">
                <input 
                  type="text" 
                  defaultValue={product.price}
                  onBlur={(e) => handleUpdatePrice(product.id, e.target.value)}
                  className="w-24 p-2 border rounded-lg text-right font-bold text-blue-600"
                />
                <button 
                  onClick={() => handleDelete(product.id)}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}