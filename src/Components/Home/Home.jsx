import { useEffect, useState } from "react";
import AccordionItem from "./AccordionItem.jsx";
import ProductCard from "./ProductCard.jsx";
import YourIconComponent from "./YourIconComponent.jsx";
import axios from "axios";

export default function Home() {
  
  
  const [openIndex, setOpenIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
    
  


  const handleAddToCart = async (productId, quantity,cartId) => {
     try {
  
    const response = await axios.post('https://ahmed-mohamed-home-bundle-builder.vercel.app/api/v1/Cart/AddToCart', {
      productId,
      quantity,
      cartId
    
    });
    

    localStorage.setItem("SessionId",JSON.stringify(cartId))
    
  
  } catch (error) {
    console.error("Error updating cart:", error);
  }
  };

  useEffect(() => {
    const fetchCategories = async () => {

      try {

        const response = await axios.get('https://ahmed-mohamed-home-bundle-builder.vercel.app/api/v1/categories/GetAllCategoriesWithInfo');
     
   
       
         
 
        setCategories(response.data.categories);

        setLoading(false);

      } catch (error) {

        console.error("Error fetching categories:", error);

        setLoading(false);

      }

    };
    fetchCategories();
    
    const fetchCart = async () => {

      try {

        const response = await axios.get('https://ahmed-mohamed-home-bundle-builder.vercel.app/api/v1/Cart/GetCart');

         
        console.log(response.data);
        
        setCart(response.data.cart);

        setLoading(false);

      } catch (error) {

        console.error("Error fetching categories:", error);

        setLoading(false);

      }

    };
    fetchCart();

  
  }, []);

  
  

  if (loading) return <div>Loading...</div>;

  return (
    <section className="HomePageSection h-[100vh]">
      <div className="content flex flex-col justify-center">
        {categories.map((cat, index) => ( <AccordionItem   key={cat._id}   stepNumber={`STEP ${index + 1} OF ${categories.length}`}   title={`Choose your ${cat.Name}`}   icon={<YourIconComponent index={index} />}   selectedCount={cat.selectedProductsCount}   isOpen={openIndex === index}   onToggle={() => setOpenIndex(index === openIndex ? null : index)} >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
              {cat.products.map((item) => (
                <ProductCard
                  key={item._id}
                  handleAddToCart={handleAddToCart}
                  product={{
                    ProductId: item._id,
                    name: item.ProductName,
                    PriceAfterOffer: item.PriceAfterOffer,
                    originalPrice: item.BasePrice,
                    image: item.ImageUrl.secure_url,
                    discount: item.TotalOffer,
                    description: item.Description,
                    colors: item.AvailableColors,
                    HasVariants: item.HasVariants,
                    Variants: item.Variants,
                    cart: cart,
                    HasOffer: item.HasOffer
                  }}
                />
              ))}
            </div>
          </AccordionItem>


        ))}
      </div>


    </section>
  );
}