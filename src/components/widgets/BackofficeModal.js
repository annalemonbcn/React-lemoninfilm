// Rsuite
import { Modal } from "rsuite";

// Utils
import { convertTimestamp } from "../../utils/utils";

// Hooks
import { useState, useContext } from "react";

// Context
import { OrdersContext } from "../../api/context/OrdersProvider";

// Toaster
import { toast } from "sonner";

const BackofficeModal = ({ order, open, onClose, toggleSeen }) => {
  // State
  const [seenStatus, setSeenStatus] = useState(order.seen);

  // Context
  const { updateSeenOrder } = useContext(OrdersContext);

  /**
   *
   */
  const auxUpdateSeen = async () => {
    try {
      // Modify seen property in remote
      await updateSeenOrder(order.id, !order.seen);

      // Modify seen property in component
      setSeenStatus(!seenStatus);

      // Modify seen property in father component
      toggleSeen(order.id);

      // Toast
      toast.success(`Marked as ${!seenStatus ? "seen" : "unseen"} :)`, {
        style: {
          background: "aquamarine",
        },
      });
    } catch (error) {
      toast.error("Error when updating the status", {
        style: {
          background: "lightpink",
        },
      });
      console.error("Error updating status:", error);
    }
  };

  // Calculate total order price
  const calculateTotal = (products) => {
    let total = 0;
    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      total += product.qty * product.price;
    }
    return total;
  };
  const totalPrice = calculateTotal(order.products);

  return (
    <Modal open={open} onClose={onClose} size={"lg"}>
      <div className="md:py-6 md:px-8">
        <div className="text-xl md:text-2xl">
          <span className="text-gray-400 font-bold">Order</span>
          <span className="font-bold"> #{order.id}</span>
        </div>
        <Modal.Body>
          <div className="mt-4 flex flex-col items-start gap-10">
            <div className="flex flex-col gap-2 w-full bg-gray-100 p-4 rounded-lg shadow-md">
              <span className="font-bold text-gray-400 border-b">
                ORDER DETAIL
              </span>
              {order.products.map((product, i) => {
                return (
                  <div className="pl-2 mt-4 flex flex-col md:flex-row md:items-center gap-3" key={i}>
                    <img
                      src={product.image}
                      alt="{product.title}"
                      className="max-w-[100px]"
                    />

                    <p>
                      <span className="font-bold">Product id: </span>
                      {product.productId}
                    </p>
                    <span className="hidden lg:block">|</span>
                    <p>
                      <span className="font-bold">Quantity: </span>
                      {product.qty}
                    </p>
                    <span className="hidden lg:block">|</span>
                    <p>
                      <span className="font-bold">Price: </span>
                      {product.price} €
                    </p>
                    <span className="hidden lg:block">|</span>
                    <p>
                      <span className="font-bold">Total: </span>
                      {product.price * product.qty} €
                    </p>
                  </div>
                );
              })}
              <p className="pl-2 mt-5 font-bold">
                ORDER TOTAL → {totalPrice} €
              </p>
              <p></p>
              <p className="pl-2">
                <span className="font-bold">- Date: </span>
                {convertTimestamp(order.date)}
              </p>
              <p className="pl-2">
                <span className="font-bold">- Seen: </span>
                {seenStatus ? "✅" : "❌"}
              </p>
              <button
                onClick={auxUpdateSeen}
                className="px-5 py-2.5 mt-6 bg-black text-white font-bold mx-auto"
              >
                Mark as {seenStatus ? "unseen" : "seen"}
              </button>
            </div>
            <div className="flex flex-col gap-2 w-full bg-gray-100 p-4 rounded-lg shadow-md">
              <span className="font-bold text-gray-400 border-b">
                USER INFO
              </span>
              <div className="pl-2 flex items-center gap-2">
                <p className="font-bold">- Name:</p>
                <p>{order.user.name}</p>
              </div>
              <div className="pl-2 flex items-center gap-2">
                <p className="font-bold">- Email:</p>
                <p>{order.user.email}</p>
              </div>
            </div>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default BackofficeModal;
