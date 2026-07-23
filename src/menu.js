const MENU = [
  {
    category: "Cafés Cubanos",
    items: [
      { id: "cafecito", name: "Cafecito", description: "Shot de espresso cubano bien dulce", price: 2.0 },
      { id: "cortadito", name: "Cortadito", description: "Espresso cortado con leche caliente", price: 3.0 },
      { id: "con-leche", name: "Café con Leche", description: "Café con mucha leche, al estilo de siempre", price: 4.0 },
      { id: "colada", name: "Colada", description: "Para compartir, sirve de 4 a 6 cafecitos", price: 6.5 }
    ]
  },
  {
    category: "Pastelitos y Bocaditos",
    items: [
      { id: "past-guayaba", name: "Pastelito de Guayaba", description: "Hojaldre relleno de guayaba", price: 3.25 },
      { id: "past-queso", name: "Pastelito de Queso", description: "Hojaldre relleno de queso crema", price: 3.25 },
      { id: "croqueta", name: "Croquetas de Jamón (3 pz)", description: "Croquetas caseras de jamón", price: 4.5 },
      { id: "empanada", name: "Empanada de Pollo", description: "Empanada frita rellena de pollo guisado", price: 4.0 }
    ]
  },
  {
    category: "Sandwiches",
    items: [
      { id: "cubano", name: "Sandwich Cubano", description: "Jamón, puerco asado, queso suizo, pepinillos y mostaza", price: 9.5 },
      { id: "medianoche", name: "Medianoche", description: "Igual que el cubano pero en pan dulce", price: 9.75 }
    ]
  },
  {
    category: "Bebidas Frías",
    items: [
      { id: "batido-mamey", name: "Batido de Mamey", description: "Batido cremoso de mamey", price: 5.5 },
      { id: "guarapo", name: "Guarapo", description: "Jugo de caña fría", price: 4.0 },
      { id: "refresco", name: "Refresco", description: "Lata fría", price: 2.5 }
    ]
  }
];

const MENU_INDEX = new Map();
for (const section of MENU) {
  for (const item of section.items) {
    MENU_INDEX.set(item.id, item);
  }
}

module.exports = { MENU, MENU_INDEX };
