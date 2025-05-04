import Header from "@/components/Header";
import { PrismaClient } from "@prisma/client";
import React from "react";
import { format } from 'date-fns';

const prisma = new PrismaClient();

export default async function Leaderboard() {
  const maxRecords = await prisma.record.groupBy({
    by: ["userId"],
    _max: {
      wordsNumber: true,
    },
  });

  const validMaxRecords = maxRecords
    .filter((record) => record._max.wordsNumber !== null)
    .map((record) => ({
      userId: record.userId,
      wordsNumber: record._max.wordsNumber as number,
    }));

  const records = await prisma.record.findMany({
    where: {
      OR: validMaxRecords,
    },
    include: {
      user: true,
    },
    orderBy: {
      wordsNumber: "desc",
    },
  });

  const uniqueRecords = Array.from(
    new Map(records.map((record) => [record.userId, record])).values()
  ).slice(0, 100);

  

  return (
    <div className="w-full flex items-center justify-center">
      <div className="container">
        <Header />

        <h1 className="mt-20 text-5xl font-bold text-[#eee] text-center">
          Leaderboard
        </h1>
        <h2 className="mb-20 mt-5 text-xl text-[#00ADB5] text-center">
          Top 100 users
        </h2>

        <table className="border-collapse border border-[#eee] table-auto w-full">
          <thead>
            <tr>
              <th className="border border-[#eee] text-[#eee] bg-[#00ADB5] p-4 w-1/3">
                Username
              </th>
              <th className="border border-[#eee] text-[#eee] bg-[#00ADB5] w-1/3">
                Words Number
              </th>
              <th className="border border-[#eee] text-[#eee] bg-[#00ADB5] w-1/3">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {uniqueRecords.map((record, i) => {
              return (
                <tr key={i}>
                  <td className="border border-[#eee] p-4 text-center">
                    {record.user.username}
                  </td>
                  <td className="border border-[#eee] p-4 text-center">
                    {record.wordsNumber}
                  </td>
                  <td className="border border-[#eee] p-4 text-center">
                    {format(new Date(record.createdAt), "MM/dd/yyyy")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
