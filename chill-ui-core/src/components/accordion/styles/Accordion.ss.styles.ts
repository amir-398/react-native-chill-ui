import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Accordion container
  accordion: {
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
  },

  // AccordionItem
  accordionItem: {
    height: 'auto',
  },
  accordionItemLast: {
    borderBottomWidth: 0,
  },

  // AccordionTrigger
  accordionTrigger: {
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '100%',
  },
  accordionTriggerDisabled: {
    opacity: 0.5,
  },

  // AccordionTrigger content
  accordionTriggerContent: {
    flex: 1,
  },
  accordionTriggerContentWithLeftIcon: {
    marginLeft: 12,
  },
  accordionTriggerContentWithRightIcon: {
    marginRight: 12,
  },

  // AccordionContent
  accordionContent: {
    backgroundColor: '#F5F7FA',
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  accordionContentHidden: {
    height: 0,
    overflow: 'hidden',
  },

  // Text styles
  triggerText: {
    color: '#111827', // gray-900
    fontWeight: '500', // medium
  },
});

export default styles;
