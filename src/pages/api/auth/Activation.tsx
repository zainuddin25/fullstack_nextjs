import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const Activation = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    try {
      const userId = req.query.id as string;
      const { password } = req.body;

      const findUser = await prisma.users.findUnique({
        where: {
          id: userId,
        },
      });

      if (findUser == null) {
        res.status(404).json({
          statusCode: 404,
          message: `Account with ${userId} not found`,
        });
      }

      if (req.body == "") {
        res.status(500).json({
          statusCode: 500,
          message: "Password required",
        });
      }

      await prisma.users.update({
        where: {
          id: findUser?.id,
        },
        data: {
          active: true,
          password: password,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Activation Account Success",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error,
      });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(500).json({
      message: `Method ${req.method} is not supported`
    })
  }
};

export default Activation;
