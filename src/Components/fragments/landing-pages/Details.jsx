const Details = () => {
  const cards = [
    {
      id: 1,

      number: "500+",

      title: "Musicans Trained",
    },
    {
      id: 2,

      number: "10th+",

      title: "Building Studio",
    },
    {
      id: 3,

      number: "750+",

      title: "Happy Client",
    },
  ];
  return (
    <div className="container flex flex-row items-center justify-center w-full mx-auto">
      <div className="flex flex-wrap md:flex-row gap-2 my-5 justify-center">
        {cards.map((card, i) => (
          <div
            key={i}
            className="relative flex flex-col    items-center   px-5 lg:p-10 rounded-lg  bottom-0"
          >
            <div>
              <p className="text-4xl sm:text-3xl font-bold text-orange-600">
                {card.number}
              </p>
              <p className="text-l py-5 text-black">{card.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;
