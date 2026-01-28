export const businessData = {
  name: "Burger King-Kong",
  logo: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
  description: "Hamburguesas reales. Sin vueltas.",
  themeColor: "#D946EF", 
  phone: "5491166264174",
  tabs: [
    {
      id: "menu",
      label: "Menú",
      icon: "menu",
      type: "list", // <--- CAMBIO AQUÍ: Tipo 'list'
      items: [      // <--- CAMBIO AQUÍ: Array de objetos
        { title: "Hamburguesa Doble", desc: "Doble carne 150g, doble cheddar, bacon crocante.", price: "$3500" },
        { title: "La Vegetariana", desc: "Medallón de lentejas, lechuga, tomate y mayonesa de palta.", price: "$3200" },
        { title: "Papas Criminales", desc: "Papas bastón con cheddar fundido, verdeo y trocitos de panceta.", price: "$2500" },
        { title: "Gaseosa 500ml", desc: "Línea Coca-Cola o Pepsi.", price: "$1000" }
      ]
    },
    {
      id: "promos",
      label: "Promos",
      icon: "star",
      type: "list", // Reutilizamos el mismo tipo
      items: [
        { title: "Combo Pareja", desc: "2 Hamburguesas Dobles + 1 Papas grande + 2 Bebidas.", price: "$8500" },
        { title: "Happy Hour", desc: "Pinta de cerveza artesanal (18hs a 20hs).", price: "$2000" }
      ]
    },
    {
      id: "info",
      label: "Info",
      icon: "info",
      type: "text", // Mantenemos texto simple para la info general
      content: "📍 Av. Corrientes 1234\n⏰ Martes a Domingo de 19 a 00hs\n🛵 Envíos por PedidosYa y Rappi."
    },
    {
      id: "cart",
      label: "Carrito",
      icon: "cart",
      type: "special" // Solo para identificarlo
    }
    
  ]
};