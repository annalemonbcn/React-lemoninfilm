// Firestore
import { getDocs, getDoc, addDoc, doc, updateDoc } from "firebase/firestore";

/**
 * fetchProductsFromFirestore *
 * Fetch request to firestore service to get all the products
 * @param {*} productsQuery 
 * @returns aux --> array with product info + product.id merged
 */
export const fetchProductsFromFirestore = async (productsQuery) => {
  try {
    const allDocs = await getDocs(productsQuery);
    const aux = allDocs.docs.map((doc) => {
      const product = doc.data();
      product.id = doc.id;
      return product;
    });
    return aux;
  } catch (error) {
    throw error;
  }
};

/**
 * fetchOrdersFromFirestore *
 * Fetch request to firestore service to get all the orders
 * @param {*} ordersQuery 
 * @returns aux --> array with order info + order.id merged
 */
export const fetchOrdersFromFirestore = async (ordersQuery) => {
  try {
    const allDocs = await getDocs(ordersQuery);
    const aux = allDocs.docs.map((doc) => {
      const order = doc.data();
      order.id = doc.id;
      return order;
    });
    return aux;
  } catch (error) {
    throw error;
  }
};

/**
 * fetchSingleProductFromFirebase *
 * Fetch request to firestore service to get a single product
 * @param {*} docRef 
 * @param {*} id 
 * @returns product with info
 */
export const fetchSingleProductFromFirestore = async (docRef, id) => {
  try {
    const docSnap = await getDoc(docRef);
    const product = docSnap.data();
    product.id = id;
    return product;
  } catch (error) {
    throw error;
  }
};

/**
 * addDocToFirebase *
 * Add a doc into orders collection
 * @param {*} collection 
 * @param {*} order 
 * @returns tokenId from firestore
 */
export const addDocToFirestore = async (collection, order) => {
  try {
    // Create the reference to the doc from firestore
    const docRef = await addDoc(collection, order);
    return docRef.id;
  } catch (error) {
    throw error;
  }
}

/**
 * updateDocToFirestore *
 * Update a doc from firestore
 * @param {*} collection --> could be any collection
 * @param {*} orderId --> the id of the doc to update
 * @param {*} propertyToUpdate --> the property we want to update
 * @param {*} newSeenValue --> the new value for the property
 * @returns 
 */
export const updateDocToFirestore = async (collection, orderId, propertyToUpdate, newValue) => {
  try {
    // Get ref to the doc
    const docRef = doc(collection, orderId);
    // UpdateDoc method
    const result = await updateDoc(docRef, {
      propertyToUpdate: newValue
    });
    return result;
  } catch (error) {
    throw error;
  }
}