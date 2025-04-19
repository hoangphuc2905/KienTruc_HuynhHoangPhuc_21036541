const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const expect = chai.expect;

chai.use(chaiHttp);

describe("Inventory Service", () => {
  it("should update inventory", (done) => {
    chai
      .request(server)
      .post("/api/inventory/update")
      .send({ orderId: "123" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property(
          "message",
          "Inventory updated successfully"
        );
        done();
      });
  });
});
