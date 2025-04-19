const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const expect = chai.expect;

chai.use(chaiHttp);

describe("Shipping Service", () => {
  it("should update shipping status", (done) => {
    chai
      .request(server)
      .post("/api/shipping/update")
      .send({ orderId: "123", status: "shipped" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("status", "shipped");
        done();
      });
  });
});
