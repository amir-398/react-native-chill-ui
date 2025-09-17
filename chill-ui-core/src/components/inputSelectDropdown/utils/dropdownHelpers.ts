import { get, isEqual } from '../../../utils';

/**
 * Vérifie si un élément est sélectionné
 */
export const isItemSelected = (currentValue: any, item: any, valueField: string): boolean => {
  if (!currentValue || !item) return false;
  return isEqual(get(currentValue, valueField), get(item, valueField));
};

/**
 * Extrait la valeur d'affichage d'un élément
 */
export const getDisplayValue = (item: any, valueField: string): string => {
  if (!item) return '';
  return get(item, valueField) || '';
};

/**
 * Extrait la valeur de recherche d'un élément
 */
export const getSearchValue = (item: any, searchField: string, valueField: string): string => {
  if (!item) return '';
  return get(item, searchField || valueField) || '';
};

/**
 * Normalise un texte pour la recherche (supprime accents, espaces, etc.)
 */
export const normalizeSearchText = (text: string): string =>
  text
    .toLowerCase()
    .replace(/\s/g, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

/**
 * Vérifie si un texte correspond au filtre de recherche
 */
export const matchesSearchFilter = (
  searchText: string,
  itemText: string,
  customSearchQuery?: (text: string, item: string) => boolean,
): boolean => {
  if (customSearchQuery) {
    return customSearchQuery(searchText, itemText);
  }

  const normalizedSearch = normalizeSearchText(searchText);
  const normalizedItem = normalizeSearchText(itemText);

  return normalizedItem.indexOf(normalizedSearch) >= 0;
};

/**
 * Filtre les données selon le texte de recherche
 */
export const filterDataBySearch = (
  data: any[],
  searchText: string,
  searchField: string,
  valueField: string,
  customSearchQuery?: (text: string, item: string) => boolean,
): any[] => {
  if (!searchText || searchText.length === 0) {
    return data;
  }

  return data.filter(item => {
    const itemText = getSearchValue(item, searchField, valueField);
    return matchesSearchFilter(searchText, itemText, customSearchQuery);
  });
};
