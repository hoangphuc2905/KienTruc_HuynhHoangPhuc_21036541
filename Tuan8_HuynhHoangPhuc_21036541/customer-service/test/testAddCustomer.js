const axios = require("axios");

const testAddCustomer = async () => {
  try {
    const response = await axios.post("http://localhost:3001/api/customers", {
      name: "Huỳnh Hoàng Phúc",
      address: "260 Lê Đức Thọ, Phường 6, Gò Vấp",
      phone: "0901234567",
      email: "hoangphuc@gmail.com",
    });
    console.log("Khách hàng đã được tạo thành công:", response.data);
  } catch (error) {
    console.error(error);
  }
};

testAddCustomer();
