import * as AntDesign from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { cartApi } from "../../api/endpoints";

export default function Product({ product }) {
  const [messageApi, contextHolder] = AntDesign.message.useMessage();
  const [incressItemQuantity] = cartApi.useIncressItemQuantityMutation();
  const [decreaseItemQuantity] = cartApi.useDecreaseItemQuantityMutation();

  const handleIncressQuantity = async (id) => {
    try {
      const res = await incressItemQuantity({ id }).unwrap();
      messageApi.success(res.message);
    } catch (error) {
      messageApi.error(error.data.message);
    }
  };
  const handleDecreaseQuantity = async (id) => {
    try {
      const res = await decreaseItemQuantity({ id }).unwrap();
      messageApi.success(res.message);
    } catch (error) {
      messageApi.error(error.data.message);
    }
  };

  return (
    <div className="h-full w-56 flex flex-col gap-6 px-6 py-4 items-center rounded-md bg-white md:justify-between md:w-[35rem] md:flex-row">
      <img
        className="h-32 w-32 object-cover object-center rounded-md"
        src={product.material.materialURL}
        alt={""}
      />
      <h1>{product.material.materialName}</h1>
      <h1>{product.material.materialPricePerMeter}/M</h1>
      <h1>{product.product.subTotalPrice}</h1>
      <h1>{product.product.totalPrice}</h1>
      <div className="flex flex-row gap-3 justify-center items-center">
        <AntDesign.Button
          onClick={() => {
            handleDecreaseQuantity(product.product._id);
          }}
          icon={<MinusOutlined />}
          className="h-8 w-8"
        />
        {product.product.quantity}
        <AntDesign.Button
          onClick={() => {
            handleIncressQuantity(product.product._id);
          }}
          icon={<PlusOutlined />}
          className="h-8 w-8"
        />
      </div>
      {contextHolder}
    </div>
  );
}
