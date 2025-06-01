import type { Meta } from '@storybook/react';

import { Avatar, Box, String, Tooltip, TooltipRoot } from '../src/components';

const meta: Meta<typeof Tooltip> = {
  argTypes: {},
  component: Tooltip,
  decorators: [
    _ => (
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
          <TooltipRoot content={<String>Amir</String>} side="bottom" sideOffset={0}>
            <Avatar
              data={{
                firstname: 'John',
                image_url: 'https://via.placeholder.com/150',
                lastname: 'Doe',
              }}
            />
          </TooltipRoot>
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
