import { useEffect, useState } from "react";
import AccordionItem from "./AccordionItem.jsx";
import ProductCard from "./ProductCard.jsx";
import ReviewCart from "./ReviewCart.jsx";
import YourIconComponent from "./YourIconComponent.jsx";
import axios from "axios";
import toast from "react-hot-toast";




export default function Home() {

  const LocalSession = localStorage.getItem("SessionId")

  const [openIndex, setOpenIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);











  const handleAddToCart = async (productId, quantity, uniqueId) => {

    const response = await axios.post('https://ahmed-mohamed-home-bundle-builder.vercel.app/api/v1/Cart/AddToCart', {
      productId,
      quantity,
      cartId: uniqueId



    }).then(() => {



      const sessionId = localStorage.setItem("SessionId", uniqueId)
      toast.success("Add SuccessFully")
      fetchCart(sessionId)

    }).catch((err) => {
      console.log("==>", err);
      toast.success(err)
    })




  }


  const fetchCart = async (sessionId) => {

    try {

      const response = await axios.get(`https://ahmed-mohamed-home-bundle-builder.vercel.app/api/v1/Cart/GetCart/${LocalSession}`);




      setCart(response.data.cart);

      setLoading(false);

    } catch (error) {

      console.error("Error fetching categories:", error);

      setLoading(false);

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
    fetchCart()




  }, []);




  if (loading) return <div>Loading...</div>;

  return (
    <section className="HomePageSection h-[100vh] ">
    <div className=" flex flex-col xl:flex-row xl:justify-around xl:w-[95%] xl:m-auto ">

        <div className="content flex flex-col justify-center xl:justify-start xl:mt-5 xl:w-[65%]">
        {categories.map((cat, index) => (<AccordionItem key={cat._id} stepNumber={`STEP ${index + 1} OF ${categories.length}`} title={`Choose your ${cat.Name}`} icon={<YourIconComponent index={index} />} selectedCount={cat.selectedProductsCount} isOpen={openIndex === index} onToggle={() => setOpenIndex(index === openIndex ? null : index)} >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2 lg:grid-cols-3 xl:grid-cols-2">
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
                  HasOffer: item.HasOffer
                }}
              />
            ))}
          </div>
        </AccordionItem>


        ))}
      </div>


      <div className="lg:col-span-1 xl:w-[30%] xl:mt-5 ">
        <ReviewCart cart={cart} />
      </div>
    </div>

    </section>
  );
}
