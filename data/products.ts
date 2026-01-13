export type Product = {
    id: string;
    name: string;
    price: number; // BDT
    category: string;
  };
  
  export const products: Product[] = [
    { id: "buraqgo-001", name: "BuraqGo Speed Car", price: 1350, category: "Toy Cars" },
    { id: "buraqgo-002", name: "BuraqGo Drift Car", price: 1190, category: "Toy Cars" },
    { id: "buraqgo-003", name: "BuraqGo Mini Racer Set", price: 990, category: "Toy Sets" },
  ];
  