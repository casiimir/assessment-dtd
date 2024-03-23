const dictionary: readonly string[] = [
  "cat",
  "dog",
  "table",
  "chair",
  "tree",
  "mountain",
  "river",
  "computer",
  "phone",
  "flower",
  "book",
  "pen",
  "moon",
  "sun",
  "star",
  "clock",
  "key",
  "door",
  "window",
  "bird",
  "fish",
  "apple",
  "banana",
  "guitar",
  "ball",
  "shoe",
  "bicycle",
  "car",
  "ship",
  "airplane",
];

export function randWordGen(): string {
  const randomIndex = Math.floor(Math.random() * dictionary.length);
  return dictionary[randomIndex];
}
