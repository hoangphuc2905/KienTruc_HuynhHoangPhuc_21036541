const axios = require("axios");

const testAddCustomer = async () => {
  try {
    const response = await axios.post("http://localhost:8080/api/customers", {
      name: "Hoàng Đình Phúc",
      address: "260 Lê Đức Thọ, Phường 6, Gò Vấp",
      phone: "555-555-5555",
      email: "phuc@gmail.com",
    });
    console.log("Khách hàng đã được tạo thành công:", response.data);
  } catch (error) {
    console.error(error);
  }
};

testAddCustomer();
