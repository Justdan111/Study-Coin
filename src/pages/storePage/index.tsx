
import { Button } from "../../components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import DesktopTitlebar from "../../components/header";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Badacore Tshirt",
    description: "Classic t-shirt for daily use",
    price: 90,
    image:"/images/shirt.jpg",
      
  },
  {
    id: 2,
    name: "MR Pucy",
    description: "Simple t-shirt for daily use",
    price: 60,
    image:"/images/shirt.jpg",
  },
  {
    id: 3,
    name: "PY Tshirt",
    description: "Classic t-shirt for daily use",
    price: 82,
    image:  "/images/shirt.jpg",
  },
  {
    id: 4,
    name: "Dadung Tshirt",
    description: "Classic t-shirt for daily use",
    price: 50,
    image: "/images/shirt.jpg",
  },
];

const categories = ["Tshirt", "Jacket", "Pants", "Hoodie", "Short"];

export default function Store() {
  return (
    <div >
        <DesktopTitlebar pageTitle={"Store"} />
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center gap-2 mb-8">
        {categories.map((category) => (
          <Button key={category} variant={category === "Tshirt" ? "default" : "outline"} className="rounded-full">
            {category}
          </Button>
        ))}
        <Button variant="outline" size="icon" className="rounded-full">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="object-cover w-full h-full transition-transform group-hover:scale-105"
              />
            </div>
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-muted-foreground text-sm">{product.description}</p>
            <p className="text-lg font-bold mt-1">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}