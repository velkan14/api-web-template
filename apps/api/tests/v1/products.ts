import { randomUUID } from "crypto";

const products = [
  {
    id: "randomuuid1",
    name: "Pioneer DJ Mixer",
    price: 699,
    imageSrc: "https://robohash.org/randomuuid1",
  },
  {
    id: "randomuuid2",
    name: "Roland Wave Sampler",
    price: 485,
    imageSrc: "https://robohash.org/randomuuid2",
  },
  {
    id: "randomuuid3",
    name: "Reloop Headphone",
    price: 159,
    imageSrc: "https://robohash.org/randomuuid3",
  },
];

for (let i = 0; i < 15; i++) {
  const id = randomUUID();
  products.push({
    id,
    name: `Pioneer DJ Mixer ${i}`,
    price: 10 * i,
    imageSrc: `https://robohash.org/${id}`,
  });
}

export default products;
