import { currentUser } from "./../../middlewares/current-user";
import request from "supertest"; //supertest : Allow us to fake a req to Express App
import { app } from "../../app";

//RQ: SuperTest by default is not going to manage cookies for us automatically (like Postman | Browser)

it("responds with details about the current user", async () => {
  const authRespoonse = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
  const cookie = authRespoonse.get("Set-Cookie");

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);
  expect(response.body.currentUser.email).toEqual("test@test.com");
  console.log(response.body);
});

it("responds with null if not authenticated", async () => {


  const response = await request(app)
    .get("/api/users/currentuser")
    .send({})
    .expect(200);
  expect(response.body.currentUser).toEqual(null);
});
