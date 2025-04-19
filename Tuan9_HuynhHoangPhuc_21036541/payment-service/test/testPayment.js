const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const expect = chai.expect;

chai.use(chaiHttp);

describe("Payment Service", () => {
  it("should confirm a payment", (done) => {
    chai
      .request(server)
      .post("/api/payments/confirm")
      .send({ orderId: "123" })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("status", "completed");
        done();
      });
  });
});
