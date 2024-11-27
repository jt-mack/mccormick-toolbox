export function toProperCase(input: string): string {
  // Replace underscores with spaces and split camelCase into words
  const words = input
    .replace(/_/g, ' ') // Replace underscores with spaces
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Split camelCase into separate words
    .split(' '); // Split into individual words

  // Capitalize the first letter of each word
  const properCasedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );

  // Join words back into a single string
  return properCasedWords.join(' ');
}