import * as user from "../user";

describe("User handler", () => {
  it("should create a new user ", async () => {
    const req = { body: { username: "user", password: "hi" } };
    const res = {
      json({ token }) {
        expect(token).toBeTruthy();
      },
    };
    const newUser = await user.createNewUser(req, res, () => {});
  });
});
