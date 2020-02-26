const UsersModel = require("./users-model");
const db = require("../data/dbConfig");

describe("users model", function() {
  describe("test enivronment", function() {
    it("should use the testing environment", function() {
      expect(process.env.DB_ENV).toBe("testing");
    });
  });

  //////////////////////// *************** add user   ******************** /////////////////////////

  describe("registerUser", function() {
    beforeEach(async () => {
      await db("users").truncate();
    });

    it("adds the new user to the db", async function() {
      await UsersModel.registerUser({
        username: "booobbbb",
        password: "pass2",
        email: "helllo@hello.com"
      });

      const user = await db("users");
      expect(user).toHaveLength(1);
    });
  });

  //////////////////////// *************** DELETE  user ******************** /////////////////////////
  describe("delete", function() {
    beforeEach(async () => {
      await db("users").truncate();
    });

    it("adds a user  to the db", async function() {
      await UsersModel.registerUser({
        id: 1,
        username: "bbb",
        password: "pass2",
        email: "bbbo@hello.com"
      });

      const user = await db("users");
      expect(user).toHaveLength(1);
    });

    it("deletes a user  from the db", async function() {
      const id = "1";
      
      await UsersModel.remove({ id });
      
      const user = await db("users");
      expect(user).toHaveLength(0);
    });
  });
});
