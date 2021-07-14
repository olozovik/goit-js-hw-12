import debounce from 'lodash.debounce';
import fetchCountries from './js/fetchCountries';
import countryTpl from './templates/countryInfo';
import countryListTpl from './templates/countryList';
import './sass/main.scss';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(event) {
  event.preventDefault();
  const nameCountry = event.target.value.trim();

  if (nameCountry.length === 0) {
    clearDataRander();
    return;
  }

  fetchCountries(nameCountry)
    .then(data => {
      if (data.length === 1) {
        clearDataRander();
        refs.countryInfo.innerHTML = countryTpl(data);
      }
      return data;
    })
    .then(data => {
      if (data.length > 1 && data.length <= 10) {
        clearDataRander();
        refs.countryList.innerHTML = countryListTpl(data);
      }
      return data;
    })
    .then(data => {
      if (data.length > 10) {
        clearDataRander();
        console.log('Too many matches found. Please enter a more specific name.');
      }
    })
    .catch(error => {
      clearDataRander();
      console.log('Oops, there is no country with that name');
    });
}

function clearDataRander() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
