import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const Role = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    try {
      const { role_name } = req.body;
      const createRole = await prisma.role.create({
        data: {
          role_name,
        },
      });
      res.status(200).json({
        message: 'Success',
        createRole
      })
    } catch (error) {
        res.status(500).json({
            message: 'Failed',
            error
        })
    } finally {
        await prisma.$disconnect()
    }
  }
};

export default Role