import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const Login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    try {
      const secretKey = "secret";
      const expiresIn = "1h";

      const { username, password } = req.body;

      const findUser = await prisma.users.findFirst({
        where: {
          username: username,
        },
      });

      const findRole = await prisma.role.findUnique({
        where: {
          id: findUser?.roleId
        }
      })

      const data = {
        username: findUser?.username,
        email: findUser?.email,
        phone_number: findUser?.phone_number,
        active: findUser?.active,
        created_at: findUser?.created_at,
        updated_at: findUser?.updated_at,
        role: findRole
      }

      if (findUser == null) {
        res.status(404).json({
          message: "User not found",
        });
      }

      if (findUser?.password !== password) {
        res.status(500).json({
          message: "Password incorect",
        });
      }

      const token = jwt.sign({ data }, secretKey, { expiresIn });

      res.status(200).json({
        token: token,
      });
      
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error,
      });
    }
  }
};

export default Login;
