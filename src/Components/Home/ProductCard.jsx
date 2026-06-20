import React from 'react';
import { nanoid } from 'nanoid';


const ProductCard = ({ product ,handleAddToCart,cart}) => {
   const uniqueId = nanoid();
   
  
    


  return (
    <div className="border border-gray-200 rounded-2xl p-6 flex flex-col items-center hover:border-[#4E2FD2] bg-white shadow-sm hover:shadow-lg transition-all duration-300">
      
  
      {product.HasOffer && (
        <span className="self-start bg-[#4E2FD2] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
          Save {product.discount}%
        </span>
      )}
      
   
      <img src={product.image} alt={product.Name} className="w-40 h-40 object-contain my-4" />
      

      <h3 className="text-lg  font-semibold text-gray-900 text-center mb-1">{product.name}</h3>
      <p className="text-sm text-gray-500 text-center mb-4 leading-relaxed">
        {product.description}
      </p>

   
      <div className="flex gap-2 mb-6 flex-wrap justify-center">
      {product.HasVariants &&  

       product.Variants?.map((Variant, index) => (
          <button  key={index}  className="flex items-center gap-2 px-2 h-12 border-1 border-gray-300 rounded-lg hover:border-[#4E2FD2]   bg-white transition-all duration-300" >
            <img src={Variant.ImageUrl.secure_url} alt={product.name} className="w-10 h-10 object-contain my-4" />
            <span className="text-xs font-semibold text-gray-700">{Variant.ColorName}</span>
          </button>
        ))
        
      }
      </div>

   
      <div className="flex justify-between items-center w-full mt-auto pt-4 border-t border-gray-100">
        <div className="flex flex-col">
          {product.HasOffer && (
            <span className="text-gray-400 line-through text-xs">{product.originalPrice}</span>
          )}
          <span className="text-lg font-semibold text-gray-900">
            {product.HasOffer ? "$"+product.PriceAfterOffer : "$"+ product.originalPrice}
          </span>
        </div>
        
     
        <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1 border border-gray-200">
          <button className={cart==null ?"w-8 h-8 flex items-center justify-center font-bold text-gray-600 bg-gray-200 hover:bg-gray-200  disabled  rounded transition-colors":"w-8 h-8 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-200 rounded transition-colors"}>-</button>
          <span className="text-sm font-semibold w-8 text-center">{product.quantity || 0}</span>
          <button onClick={cart ==null ?()=>handleAddToCart(product.ProductId,1,uniqueId):''} className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-200 rounded transition-colors cursor-pointer">+</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;