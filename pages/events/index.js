import Image from "next/image";

const EventsPage = ({ data }) => {
  return (
    <div>
      <h1>Events Page</h1>
      <div>
        {data.map((eve) => (
          <a key={eve.id} href={`/events/${eve.id}`}>
            <Image src={eve.image} alt={eve.title} width={300} height={300}/>
            <h2>{eve.title} </h2>
          </a>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;

export async function getStaticProps() {
  const { events_categories } = await import("/data/data.json");
  return {
    props: {
      data: events_categories,
    },
  };
}
