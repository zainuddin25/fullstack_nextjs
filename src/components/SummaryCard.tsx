type Props = {
    key: string,
    title: string,
    total: number
}

const SummaryCard = ({ key, title, total }: Props) => {
  return (
    <div
      className="w-full h-full border border-slate-300 px-6 py-5 flex flex-col justify-between relative group duration-200 cursor-pointer"
      key={key}
    >
      <p className="text-slate-500 text-sm group-hover:text-slate-300 z-50 duration-200">
        {title}
      </p>
      <h1 className="text-3xl font-bold group-hover:text-white z-50 duration-200">
        <span className="font-sans">{total}</span> Account
      </h1>
      <div className="absolute top-0 left-0 bg-black w-0 h-full group-hover:w-full duration-200"></div>
    </div>
  );
};

export default SummaryCard
