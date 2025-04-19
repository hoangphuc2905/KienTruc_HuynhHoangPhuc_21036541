const axios = require("axios");

const testAddOrder = async () => {
  try {
    const response = await axios.post("http://localhost:3002/api/orders", {
      customerId: "67f9b75e3228a6c5ac09051d",
      products: [
        {
          productId: "67f9b51ad75a81e0cf6b1cfa",
          quantity: 1,
        },
        {
          productId: "67f9b554d75a81e0cf6b1cfc",
          quantity: 2,
        },
      ],
    });
    console.log("Đơn hàng đã được tạo thành công:", response.data);
  } catch (error) {
    console.error(
      " Lỗi khi tạo đơn hàng:",
      error.response?.data || error.message
    );
  }
};

testAddOrder();
