import { useStyles } from 'react-native-unistyles';
import { TextInput } from 'react-native-gesture-handler';
import { ActivityIndicator, ListRenderItemInfo, Pressable, View } from 'react-native';
import React, { useCallback, useEffect, useMemo, memo, useRef, useImperativeHandle, forwardRef } from 'react';
import { Text } from '$components/Kiwii';

import { stylesheet } from './FormAutoComplete.style';
import { FormBaseInput } from '../../../FormBaseInput';
import useDropdownState from '../../hooks/useDropdownState';
import useDropdownActions from '../../hooks/useDropdownActions';
import useDropdownKeyboard from '../../hooks/useDropdownKeyboard';
import useGetDropdownPosition from '../../hooks/useGetDropdownPosition';
import { FormAutoCompleteHighlither } from '../FormAutoCompleteHighlither';
import { FormDropdownDataSetProps, FormDropdown } from '../../../FormDropdown';
import { FormAutoCompleteNothingFound } from '../FormAutoCompleteNothingFound';
import { IFormAutoCompleteProps, IFormAutoCompleteRef } from './FormAutoComplete.props';
import useAutocompleteDropdownProvider from '../../hooks/useAutocompleteDropdownProvider';

const FormAutoComplete = forwardRef<IFormAutoCompleteRef, IFormAutoCompleteProps>(
  (props: IFormAutoCompleteProps, ref) => {
    const { styles } = useStyles(stylesheet);
    const {
      dataSet,
      disabled,
      dropdownRenderItem,
      emptyResultText,
      error,
      footer,
      helpInfo,
      highlightTerm = true,
      highlightValue,
      isLoading,
      isRequired,
      label,
      listFooterComponent,
      onBlur,
      onChangeText,
      onFocus,
      onSelectItem,
      placeholder,
      position = 'auto',
      primaryContentKey,
      secondaryContentKey,
      setValue,
      suggestionsListMaxHeight = 250,
      value,
    } = props;

    const instanceId = useRef(`autocomplete-${Math.random().toString(36).slice(2, 11)}`).current;

    const {
      getInstance,
      registerInstance,
      setDropdownContent,
      setDropdownPosition,
      setShowDropdown,
      unregisterInstance,
    } = useAutocompleteDropdownProvider();

    const { state, updateState } = useDropdownState();
    const inputRef = useRef<TextInput>(null);
    const inputContainerRef = useRef<View | null>(null);

    // Enregistrer cette instance lors du montage
    useEffect(() => {
      registerInstance(instanceId, inputContainerRef);
      return () => {
        unregisterInstance(instanceId);
      };
    }, [instanceId, registerInstance, unregisterInstance]);

    const instance = getInstance(instanceId);

    const { getDropdownPosition } = useGetDropdownPosition({
      inputContainerRef,
      setDropdownPosition: pos => {
        setDropdownPosition(instanceId, pos);
      },
      waitForKeyboard: !!inputRef?.current?.isFocused(),
    });

    const { eventClose, eventOpen } = useDropdownActions({
      disabled: disabled ?? false,
      getDropdownPosition,
      position,
      setDropdownPosition: pos => {
        setDropdownPosition(instanceId, pos);
      },
      setShowDropdown: show => {
        setShowDropdown(instanceId, show);
      },
      state: { ...state, showDropdown: instance?.showDropdown ?? false },
    });

    useDropdownKeyboard(
      height => {
        updateState({ keyboardHeight: height });
      },
      () => {
        updateState({ keyboardHeight: 0 });
      },
    );
    const isInputFocused = inputRef?.current?.isFocused();

    useImperativeHandle(ref, () => ({
      blur: () => {
        inputRef.current?.blur();
      },
      close: eventClose,
      focus: () => {
        inputRef.current?.focus();
      },
      open: eventOpen,
    }));

    useEffect(() => {
      if (value && value.length > 0 && isInputFocused) {
        eventOpen();
      } else {
        eventClose();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, isInputFocused]);

    const handleChangeText = useCallback(
      (text: string) => {
        setValue(text);
        onChangeText?.(text);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [onChangeText],
    );

    const defaultRenderItem = useCallback(
      ({ item }: ListRenderItemInfo<FormDropdownDataSetProps>): React.ReactElement => (
        <Pressable
          style={styles.renderItemContainer}
          onPress={() => {
            onSelectItem?.(item);
            const selectedValue = `${item[primaryContentKey]} ${
              secondaryContentKey ? `(${item[secondaryContentKey]})` : ''
            }`;
            setValue(selectedValue);
            setTimeout(() => {
              inputRef?.current?.blur();
            }, 100);
          }}
        >
          <FormAutoCompleteHighlither
            text={item[primaryContentKey] ?? ''}
            highlightTerm={highlightTerm ? (highlightValue ?? value) : ''}
            style={styles.primaryTextStyle}
            highlightStyle={styles.highlightStyle}
          />
          {secondaryContentKey && <Text style={styles.secondaryTextStyle}>{item[secondaryContentKey]}</Text>}
        </Pressable>
      ),
      [
        highlightTerm,
        primaryContentKey,
        secondaryContentKey,
        setValue,
        highlightValue,
        onSelectItem,
        styles,
        inputRef,
        value,
      ],
    );

    const renderItem = useMemo(() => {
      if (dropdownRenderItem) {
        return dropdownRenderItem;
      }

      return defaultRenderItem;
    }, [dropdownRenderItem, defaultRenderItem]);

    const onPressRightIcon = useCallback(() => {
      setValue('');
    }, [setValue]);

    useEffect(() => {
      setDropdownContent(
        instanceId,
        <FormDropdown
          dataSet={dataSet}
          suggestionsListMaxHeight={suggestionsListMaxHeight}
          renderItem={renderItem}
          ListFooterComponent={listFooterComponent ? () => <>{listFooterComponent}</> : undefined}
          footer={footer}
          ListEmptyComponent={
            isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator />
              </View>
            ) : (
              <FormAutoCompleteNothingFound content={emptyResultText} />
            )
          }
        />,
      );
    }, [
      instanceId,
      isLoading,
      setDropdownContent,
      renderItem,
      listFooterComponent,
      footer,
      emptyResultText,
      dataSet,
      suggestionsListMaxHeight,
      styles,
    ]);

    return (
      <View ref={inputContainerRef}>
        <FormBaseInput
          ref={inputRef}
          ID="test"
          value={value}
          onChangeText={handleChangeText}
          leftIconAction={{
            iconName: 'magnifying-glass--regular',
            ID: 'search',
          }}
          rightIconAction={
            value
              ? {
                  iconName: 'xmark--regular',
                  ID: 'clear-input',
                  onPress: onPressRightIcon,
                }
              : undefined
          }
          placeholder={placeholder ?? ''}
          error={error}
          onFocus={() => {
            onFocus?.();
          }}
          onBlur={() => {
            onBlur?.();
            setShowDropdown(instanceId, false);
          }}
          mode={error?.type}
          label={label}
          helpInfo={helpInfo}
          isRequired={isRequired}
          disabled={disabled}
        />
      </View>
    );
  },
);

export default memo(AutocompleteDropdown);
