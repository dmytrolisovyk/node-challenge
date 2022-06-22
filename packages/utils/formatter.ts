export function capitalize(word) {
  const str = `${word}`;
  return str[0].toUpperCase() + str.slice(1);
}

export function secureTrim<T1, T2>(obj: T1, publicFields: string[]): T2 {
  const securedObject = Object.fromEntries(publicFields.map((key) => [key, obj[key]]));
  return securedObject as T2;
}
