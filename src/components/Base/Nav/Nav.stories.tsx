import type { Meta, StoryObj } from "@storybook/react";
import Nav from "./Nav";
import { MemoryRouter } from "react-router-dom";

const meta: Meta<typeof Nav> = {
    component: Nav,
    title: 'Base/Nav',
    decorators: [
        (Story) => (
          <MemoryRouter initialEntries={['/']}>
            <Story />
          </MemoryRouter>
        ),
    ]
}

export default meta;

type Story = StoryObj<typeof meta>;

export const Navigation: Story = {}