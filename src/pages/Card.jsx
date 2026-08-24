import { useCartStore } from '../Components/useCartStore'; 
import ProductCard from '../Components/ProductCard'; // <-- ԱՌԱՆՑ ՓԱԿԱԳԾԵՐԻ ({ })
import { header } from "../Components/header";
import Footer from '../Components/footer.jsx';

function Card() {
  const likedItems = useCartStore((state) => state.likedItems);

  return (
    <>
      {header()}
      
      <div className="max-w-7xl mx-auto px-4 py-8 mt-[120px] mb-[60px]">
        <h1 className="text-3xl font-bold mb-6 text-center">Liked Products (Wishlist)</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {likedItems.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 text-lg">
              Դեռևս հավանած ապրանքներ չկան։
            </p>
          ) : (
            likedItems.map((el, i) => {
              const isSpecial = Boolean(el.amsekan); 

              return (
                <ProductCard 
                  key={el.id || i} 
                  el={el} 
                  i={i} 
                  isSpecial={isSpecial} 
                />
              );
            })
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Card;