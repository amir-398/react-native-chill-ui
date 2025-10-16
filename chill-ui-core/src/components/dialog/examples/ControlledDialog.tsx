import { View } from 'react-native';
import React, { useState } from 'react';
import { Button } from '@components/button';
import { String } from '@components/string';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '../index';

/**
 * Example component demonstrating controlled Dialog usage
 */
export function ControlledDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    console.log('Dialog open state changed:', open);
    setIsOpen(open);
  };

  const handleOpen = () => {
    console.log('Dialog opened');
  };

  const handleClose = () => {
    console.log('Dialog closed');
  };

  return (
    <View style={{ padding: 20 }}>
      <String>Controlled Dialog Example</String>

      <Dialog open={isOpen} onOpenChange={handleOpenChange} onOpen={handleOpen} onClose={handleClose}>
        <DialogTrigger>
          <Button title="Open Controlled Dialog" />
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Controlled Dialog</DialogTitle>
          </DialogHeader>

          <String>This dialog is controlled by external state.</String>
          <String>Current state: {isOpen ? 'Open' : 'Closed'}</String>

          <DialogFooter>
            <DialogClose>
              <Button title="Close" />
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </View>
  );
}

/**
 * Example component demonstrating uncontrolled Dialog usage
 */
export function UncontrolledDialog() {
  const handleOpenChange = (open: boolean) => {
    console.log('Dialog open state changed:', open);
  };

  const handleOpen = () => {
    console.log('Dialog opened');
  };

  const handleClose = () => {
    console.log('Dialog closed');
  };

  return (
    <View style={{ padding: 20 }}>
      <String>Uncontrolled Dialog Example</String>

      <Dialog defaultOpen={false} onOpenChange={handleOpenChange} onOpen={handleOpen} onClose={handleClose}>
        <DialogTrigger>
          <Button title="Open Uncontrolled Dialog" />
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Uncontrolled Dialog</DialogTitle>
          </DialogHeader>

          <String>This dialog manages its own state internally.</String>

          <DialogFooter>
            <DialogClose>
              <Button title="Close" />
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </View>
  );
}
