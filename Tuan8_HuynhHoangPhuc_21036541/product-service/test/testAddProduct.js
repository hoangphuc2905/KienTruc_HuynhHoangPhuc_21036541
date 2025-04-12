const axios = require("axios");

async function testCreateProduct() {
  try {
    const response = await axios.post("http://localhost:3000/api/products", {
      name: "Nho mẫu đơn",
      price: 99000,
      description: "Nho mẫu đơn là một loại trái cây ngon và bổ dưỡng.",
      stock: 100,
    });
    console.log("Sản phẩm đã được tạo thành công:", response.data);
  } catch (error) {
    console.error(
      "Lỗi khi tạo sản phẩm:",
      error.response?.data || error.message
    );
  }
}

testCreateProduct();
