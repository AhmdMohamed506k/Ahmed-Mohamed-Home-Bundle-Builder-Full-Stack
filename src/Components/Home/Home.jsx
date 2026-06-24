import { useEffect, useState } from "react";
import AccordionItem from "./AccordionItem.jsx";
import ProductCard from "./ProductCard.jsx";
import ReviewCart from "./ReviewCart.jsx";
import YourIconComponent from "./YourIconComponent.jsx";
import axios from "axios";
import toast from "react-hot-toast";

export default function Home() {
  const [openIndex, setOpenIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [loadingProductId, setLoadingProductId] = useState(null); 


  const fetchCart = async () => {
    const sessionId = localStorage.getItem("SessionId");
    if (!sessionId) {
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`https://ahmed-mohamed-home-bundle-builder.vercel.app/api/v1/Cart/GetCart/${sessionId}`);
      setCart(response.data.cart);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };


  const handleAddToCart = async (productId, quantity, uniqueId) => {
    try {
      await axios.post('https://ahmed-mohamed-home-bundle-builder.vercel.app/api/v1/Cart/AddToCart', {
        productId,
        quantity,
        cartId: uniqueId
      });
      localStorage.setItem("SessionId", uniqueId);
      toast.success("Added Successfully");
      fetchCart();
    } catch (err) {
      toast.error("Failed to add to cart");
    }
  };


  const handleUpdateQuantity = async (productId, cartId, action) => {
    setLoadingProductId(productId); 
    try {
      await axios.put('https://ahmed-mohamed-home-bundle-builder.vercel.app/api/v1/Cart/UpdateProductQuantity', {
        productId,
        cartId,
        action
      });
      toast.success("Updated Successfully");
      fetchCart();
    } catch (err) {
      toast.error("Failed to update");
    } finally {
      setLoadingProductId(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const catRes = await axios.get('https://ahmed-mohamed-home-bundle-builder.vercel.app/api/v1/categories/GetAllCategoriesWithInfo');
        setCategories(catRes.data.categories);
        await fetchCart();
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    fetchCart()
  }, []);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <section className="HomePageSection min-h-screen py-8 bg-gray-50">
      <div className="flex flex-col lg:flex-col xl:flex-row justify-center gap-8 w-[95%] xl:w-[90%] mx-auto">
        
      
        <div className="content w-full lg:w-full space-y-4">
          {categories.map((cat, index) => (
            <AccordionItem 
              key={cat._id} 
              stepNumber={`STEP ${index + 1} OF ${categories.length}`} 
              title={`Choose your ${cat.Name}`} 
              icon={<YourIconComponent index={index} />} 
              selectedCount={cat.selectedProductsCount} 
              isOpen={openIndex === index} 
              onToggle={() => setOpenIndex(index === openIndex ? null : index)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-4 p-2">
                {cat.products.map((item) => (
                  <ProductCard
                    key={item._id}
                    HandelSetToCart={setCart}
                    handleAddToCart={handleAddToCart}
                    handleUpdateQuantity={handleUpdateQuantity}
                    product={{
                      ProductId: item._id,
                      name: item.ProductName,
                      image: item.ImageUrl.secure_url,
                      description: item.Description,
                      HasOffer: item.HasOffer,
                      TotalOffer: item.TotalOffer,   
                      HasVariants: item.HasVariants,
                      Variants: item.Variants,
                      originalPrice: item.BasePrice,
                      PriceAfterOffer: item.PriceAfterOffer,
                      quantity: cart?.Products?.find(p => p.productId._id === item._id)?.quantity || 0
                    }}
                  />
                ))}
              </div>

           
              {index < categories.length - 1 && (
               <div className="flex justify-center">
                  <button  onClick={() => setOpenIndex(index + 1)}  className="w-75 mx-auto border  border-[#4E2FD2] hover:bg-[#5533e8] text-[#4E2FD2] hover:text-white py-2 rounded-xl font-bold mt-6 transition-colors cursor-pointer" >
                  Next: Choose your {categories[index + 1].Name}
                </button>
               </div>
              )}
            </AccordionItem>
          ))}
        </div>

        <div className="w-full lg:w-full xl:w-[40%]">
          <div className="lg:sticky lg:top-5">
            <ReviewCart 
              cart={cart} 
              handleUpdateQuantity={handleUpdateQuantity} 
              isLoading={loadingProductId} 
            />
          </div>
        </div>

      </div>
    </section>
  );
}