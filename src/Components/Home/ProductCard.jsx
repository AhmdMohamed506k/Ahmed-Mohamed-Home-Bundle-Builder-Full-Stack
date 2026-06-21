import React from 'react';
import { customAlphabet, nanoid } from 'nanoid';


const ProductCard = ({ product, handleAddToCart, cart }) => {

  const LocalSession = localStorage.getItem("SessionId")

  function GenerateCode() {
    const alphabet = 'ABCDEF1234567890';
    const MyAlphabet = customAlphabet(alphabet, 10);
    const uniqueId = MyAlphabet()
    return uniqueId
  }

















  return (
    <div className="border border-gray-200 rounded-2xl p-6 flex flex-col items-center hover:border-[#4E2FD2] bg-white shadow-sm hover:shadow-lg transition-all duration-300 xl:flex-row xl:w-full xl:h-50  lg:w-80 ">


      <div className='w-40'>
        {product.HasOffer && (
          <span className="self-start bg-[#4E2FD2] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            Save {product.discount}%
          </span>
        )}


        <img src={product.image} alt={product.Name} className="w-40 h-40 xl:w-30 xl:h-30 object-contain my-4" />
      </div>


      <div  className=' xl:w-[95%] w-full'>
        <h3 className="text-lg xl:text-sm  font-semibold text-gray-900 text-center mb-1 xl:text-start xl:mt-1">{product.name}</h3>
        <p className="text-sm xl:text-[10px] xl:mx-auto text-gray-500 text-center mb-4  xl:text-start leading-relaxed">
          {product.description}
        </p>


        <div className="flex gap-2 mb-6 xl:mb-2 flex-wrap justify-center xl:justify-start">
          {product.HasVariants &&

            product.Variants?.map((Variant, index) => (
              <button key={index} className="flex items-center gap-2 px-2 h-12 xl:h-8  border-1 border-gray-300 rounded-lg hover:border-[#4E2FD2]   bg-white transition-all duration-300" >
                <img src={Variant.ImageUrl.secure_url} alt={product.name} className="w-10 h-10 xl:w-7 object-contain my-4" />
                <span className="text-xs font-semibold text-gray-700">{Variant.ColorName}</span>
              </button>
            ))

          }
        </div>


        <div className="flex justify-between items-center w-full mt-auto pt-4 border-t xl:border-0 xl:flex-row-reverse border-gray-100">
          <div className="flex flex-col">
            {product.HasOffer && (
              <span className="text-gray-400 line-through text-xs xl:text-end text-red-700">${product.originalPrice}</span>
            )}
            <span className="text-lg font-semibold text-gray-600">
              {product.HasOffer ? "$" + product.PriceAfterOffer : "$" + product.originalPrice}
            </span>
          </div>


          <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1 border border-gray-200">
            <button className={cart == null ? "w-8 h-8 flex items-center justify-center font-bold text-gray-600 bg-gray-200 hover:bg-gray-200  disabled  rounded transition-colors" : "w-8 h-8 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-200 rounded transition-colors"}>-</button>
            <span className="text-sm font-semibold w-8 text-center">{product.quantity || 0}</span>
            <button onClick={cart == null ? () => handleAddToCart(product.ProductId, 1, LocalSession || GenerateCode()) : ""} className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-200 rounded transition-colors cursor-pointer">+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;