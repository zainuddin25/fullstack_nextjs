import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const User = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "GET") {
    try {
      const getAllUser = await prisma.users.findMany({
        select: {
            username: true,
            email: true,
            phone_number: true,
            created_at: true,
            updated_at: true,
            role: true
        }
      });
      res.status(200).json({
        statusCode: 200,
        message: "Success Get All Users",
        getAllUser,
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        message: "Failed Get All Users",
        error,
      });
    } finally {
      await prisma.$disconnect();
    }
  } else if (req.method == "POST") {
    const { username, email, phone_number, roleId } = req.body;
    try {
      const createUser = await prisma.users.create({
        data: {
          username,
          email,
          phone_number,
          roleId
        },
      });
      res.status(201).json({
        statusCode: 201,
        message: "Create User Success",
        createUser,
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        message: "Create User Failed",
        error,
      });
    } finally {
      await prisma.$disconnect();
    }
  } else if (req.method == "DELETE") {
    try {
      const userId = Number(req.query.id);

      const deleteUser = await prisma.users.delete({
        where: {
          id: userId,
        },
      });
      res.status(200).json({
        statusCode: 200,
        message: "Delete User Success",
        deleteUser,
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        message: "Delete User Failed",
        error,
      });
    } finally {
      await prisma.$disconnect();
    }
  } else if (req.method == "PUT") {
    try {
      const { username, email, phone_number } = req.body;
      const userId = Number(req.query.id);

      const editUser = await prisma.users.update({
        where: {
          id: userId,
        },
        data: {
          username,
          email,
          phone_number,
        },
      });
      res.status(200).json({
        statusCode: 200,
        message: "Edit User Success",
        editUser,
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        message: "Failed Edit User",
        error,
      });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).end();
  }
};

export default User;
