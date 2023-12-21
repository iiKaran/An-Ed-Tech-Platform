import { useSelector } from "react-redux"
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";
export default function Cart() {
    const { total, totalItems } = useSelector((state) => state.cart);
    return (
        <div className="text-white">
            {total > 0
                ? (<div className="flex flex-col gap-8  px-12 py-12">
                    <div className="flex gap-2 flex-col">
                    <div className="font-bold text-[30px] ">
                        My Wishlist
                        </div>
                        <div className="capitalize text-sm font-light">
                        dashboard {" "} / {" "} cart {" "} <span className="text-yellow-25">/ {" "}wishlist</span>
                        </div>
                        
                    
                    </div>
                    
                    <RenderCartCourses />
                    <RenderTotalAmount />
                </div>)
                : (<p>Your Cart is Empty</p>)}
        </div>
    )
}