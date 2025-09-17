import { useContext } from 'react';

import { AutocompleteContext } from '../context/AutoCompleteDropdownContext';

const useAutocompleteDropdownProvider = () => {
  const context = useContext(AutocompleteContext);

  if (!context) {
    throw new Error('useAutocompleteDropdownProvider must be used within an AutocompleteDropdownProvider');
  }

  return context;
};

export default useAutocompleteDropdownProvider;
