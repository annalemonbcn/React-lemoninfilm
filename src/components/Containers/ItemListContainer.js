// Hooks
import { useEffect, useState, useContext } from "react";

// Routing
import { useParams } from "react-router-dom";

// Components
import ItemListView from "../views/ItemListView";

// Context
import { ProductsContext } from "../../api/context/ProductsProvider";

const ItemListContainer = () => {
  // State
  const [products, setProducts] = useState([]);

  // Params
  const { id } = useParams();

  // Context
  const allProducts = useContext(ProductsContext);

  // Effects
  useEffect(() => {
    auxSetProducts();
  }, [id, allProducts]);

  /**
   * Aux method to fetch all the products from the firestore db
   * Filter them by params for the different categories
   */
  const auxSetProducts = () => {
    // Filter products by size if params.id exists
    if (!id) {
      setProducts(allProducts);
    } else {
      const filteredProducts = allProducts.filter(
        (product) => product.categories.includes(id)
      );
      setProducts(filteredProducts);
    }
  };

  // View
  return <ItemListView products={products} />;
};

export default ItemListContainer;
