import SummaryCard from "@/components/SummaryCard";

const User = () => {
  const data = [
    {
      title: 'Account Active',
      total: 20
    },
    {
      title: 'Account Non Active',
      total: 40
    },
    {
      title: 'Panding Account',
      total: 1
    },
    {
      title: 'Total Account',
      total: 61
    }
  ];
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-4 gap-8 h-28">
        {data.map((result) => {
          return (
            <SummaryCard key={result.title} title={result.title} total={result.total} />
          );
        })}
      </div>
    </div>
  );
};

export default User;
