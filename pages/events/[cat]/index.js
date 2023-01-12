import Image from "next/image";

const EventsCatPage = ({ data }) => {
  return (
    <div>
      <h1>Events in London</h1>
      <div>
        {data.map(eve => (
          <a key={eve.id} href={`/events/${eve.city}/${eve.id}`}>
           <Image src={eve.image} alt={eve.title} width={300} height={300}/>
          <h2>{eve.title}</h2>
          <p>{eve.description}</p>
        </a>
        ))}
      </div>
    </div>
  );
};

export default EventsCatPage;

export async function getStaticPaths() {
  const { events_categories } = await import("/data/data.json");
  const allPaths = events_categories.map(eve => {
    return {
      params: {
        cat: eve.id.toString(),
      },
    }
  })
  return {
    paths: allPaths,
    fallback: false
  };
}

export async function getStaticProps(context) {
  console.log(context);
  const id = context?.params.cat;
  const { allEvents } = await import("/data/data.json");
  console.log(id);
  const data = allEvents.filter(eve => eve.city === id)
  console.log(data);
  return {
    props: { data } //data: data 
  }
}
