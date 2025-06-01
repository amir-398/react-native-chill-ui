import type { Meta, StoryObj } from '@storybook/react';

import { Avatar, Box, String, Tooltip } from '../src/components';

const meta: Meta<typeof Tooltip> = {
  argTypes: {},
  component: Tooltip,
  decorators: [
    story => (
      <>
        <Box
          style={{
            alignItems: 'center',
            backgroundColor: 'red',
            height: 100,
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {/* <TooltipRoot content={<String>Amir</String>} side="bottom" sideOffset={0}>
            <Avatar
              data={{
                firstname: 'John',
                image_url: 'https://via.placeholder.com/150',
                lastname: 'Doe',
              }}
            />
          </TooltipRoot> */}
        </Box>
        <Box style={{}}>
          {/* <Avatar
            data={{
              firstname: 'John',
              image_url: 'https://via.placeholder.com/150',
              lastname: 'Doe',
            }}
          /> */}
          <Box
            style={{
              alignItems: 'center',
              backgroundColor: 'red',
              height: 100,
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Tooltip title="Amir">
              <Avatar
                data={{
                  firstname: 'Meb',
                  image_url: 'https://via.placeholder.com/150',
                  lastname: 'Doe',
                }}
              />
            </Tooltip>
          </Box>
        </Box>
      </>
    ),
  ],
  title: 'components/Tooltip',
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: <String>Amir</String>,
    side: 'bottom',
    sideOffset: 0,
  },
};
