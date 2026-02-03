import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "lucide-react";

export default function EmptyCart(){
    return(
        <div>
            <p className="flex items-center gap-2 p-4 text-lg">Your cart is empty 
                <ShoppingCartIcon
                size={26}
                className="text-gray-700 hover:text-yellow-400" />
                </p>
            <Link className="font-bold text-xl p-4 hover:text-blue-300" to="/products">
            &larr; Back to Products</Link>
        </div>
    )
}