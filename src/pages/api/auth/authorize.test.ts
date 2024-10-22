import { authorize } from "./[...nextauth]";
import connectMongo from "../../../lib/mongodb";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

jest.mock("../../../lib/mongodb");
jest.mock("../../../models/User", () => ({
  findOne: jest.fn(),
}));

describe("authorize", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return user data if credentials are correct", async () => {
    const credentials = { email: "test@example.com", password: "password123" };
    const user = {
      _id: "123",
      email: "test@example.com",
      password: bcrypt.hashSync("password123", 10),
    };

    (User.findOne as jest.Mock).mockResolvedValue(user);
    (bcrypt.compareSync as jest.Mock).mockReturnValue(true);

    const result = await authorize(credentials);

    expect(result).toEqual({ id: "123", email: "test@example.com" });
  });

  it("should return null if credentials are incorrect", async () => {
    const credentials = {
      email: "test@example.com",
      password: "wrongpassword",
    };
    const user = {
      _id: "123",
      email: "test@example.com",
      password: bcrypt.hashSync("password123", 10),
    };

    (User.findOne as jest.Mock).mockResolvedValue(user);
    (bcrypt.compareSync as jest.Mock).mockReturnValue(false);

    const result = await authorize(credentials);

    expect(result).toBeNull();
  });

  it("should return null if no credentials are provided", async () => {
    const result = await authorize(null);

    expect(result).toBeNull();
  });

  it("should return null if user is not found", async () => {
    const credentials = {
      email: "notfound@example.com",
      password: "password123",
    };

    (User.findOne as jest.Mock).mockResolvedValue(null);

    const result = await authorize(credentials);

    expect(result).toBeNull();
  });

  it("should throw an error if MongoDB connection fails", async () => {
    const credentials = { email: "test@example.com", password: "password123" };

    (connectMongo as jest.Mock).mockImplementation(() => {
      throw new Error("MongoDB connection error");
    });

    await expect(authorize(credentials)).rejects.toThrow(
      "MongoDB connection error"
    );
  });
});
