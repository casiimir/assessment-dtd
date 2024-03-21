const dictionary: readonly string[] = [
  "gatto",
  "cane",
  "tavolo",
  "sedia",
  "albero",
  "montagna",
  "fiume",
  "computer",
  "telefono",
  "fiore",
  "libro",
  "penna",
  "luna",
  "sole",
  "stella",
  "orologio",
  "chiave",
  "porta",
  "finestra",
  "uccello",
  "pesce",
  "mela",
  "banana",
  "chitarra",
  "pallone",
  "scarpa",
  "bicicletta",
  "auto",
  "nave",
  "aereo",
];

export function randWordGen(): string {
  const randomIndex = Math.floor(Math.random() * dictionary.length);
  return dictionary[randomIndex];
}
