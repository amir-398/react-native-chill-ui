// Hybrid version (auto-detects NativeWind)
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogToaster,
  DialogTrigger,
} from './components/Dialog';

// StyleSheet version
export {
  Dialog as DialogSs,
  DialogClose as DialogCloseSs,
  DialogContent as DialogContentSs,
  DialogFooter as DialogFooterSs,
  DialogHeader as DialogHeaderSs,
  DialogTitle as DialogTitleSs,
  DialogToaster as DialogToasterSs,
  DialogTrigger as DialogTriggerSs,
} from './components/Dialog.ss';

// Tailwind version (NativeWind)
export {
  Dialog as DialogTw,
  DialogClose as DialogCloseTw,
  DialogContent as DialogContentTw,
  DialogFooter as DialogFooterTw,
  DialogHeader as DialogHeaderTw,
  DialogTitle as DialogTitleTw,
  DialogToaster as DialogToasterTw,
  DialogTrigger as DialogTriggerTw,
} from './components/Dialog.tw';

// Context and hooks
export { DialogProvider, useDialog } from './DialogContext';

// Types
export type { DialogToasterRef } from './components/Dialog';
