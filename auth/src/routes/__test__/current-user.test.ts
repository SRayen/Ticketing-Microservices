import { currentUser } from "@srayen-tickets/common";
import request from "supertest"; //supertest : Allow us to fake a req to Express App
import { app } from "../../app";

//RQ: SuperTest by default is not going to manage cookies for us automatically (like Postman | Browser)
it("responds with details about the current user", async () => {
  const cookie = await global.signin();

  const response = await request(app)
    .get("/api/users/currentuser")
    //sets the Cookie header in the request / The cookie is then sent to the server as part of the request header
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("responds with null if not authenticated", async () => {
  const response = await request(app)
    .get("/api/users/currentuser")
    .send({})
    .expect(200);
  expect(response.body.currentUser).toEqual(null);
});
