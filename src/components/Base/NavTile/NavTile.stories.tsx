import type { Meta, StoryObj } from "@storybook/react";
import NavTile from "./NavTile";
import { MemoryRouter } from "react-router-dom";

const meta: Meta<typeof NavTile> = {
    component: NavTile,
    title: 'Base/Nav Tile',
    decorators: [
        (Story) => (
          <MemoryRouter initialEntries={['/']}>
            <Story />
          </MemoryRouter>
        ),
    ],
    tags: ['autodocs'],
    argTypes: {
        textColor: {
            control: { type: 'radio' },
            options: ['red', 'green', 'blue', 'orange']
        }
    }
}

export default meta;

type Story = StoryObj<typeof meta>;

export const Home: Story = {
    args: {
        textColor: 'red',
        label: 'Home'
    }
}

export const Intervals: Story = {
    args: {
        textColor: 'green',
        label: 'Intervals'
    }
}
export const Workouts: Story = {
    args: {
        textColor: 'blue',
        label: 'Workouts'
    }
}
export const Stats: Story = {
    args: {
        textColor: 'orange',
        label: 'Stats'
    }
}