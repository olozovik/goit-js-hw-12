export default function fetchCountries(name) {
  const params = new URLSearchParams({
    fields: 'name;capital;population;flag;languages',
  });
  const URL = `https://restcountries.eu/rest/v2/name/${name}?${params}`;

  return fetch(URL).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
