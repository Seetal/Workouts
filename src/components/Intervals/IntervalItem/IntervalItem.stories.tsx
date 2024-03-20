import type { Meta, StoryObj } from "@storybook/react";
import IntervalItem from "./IntervalItem";
import { MemoryRouter } from "react-router-dom";

const meta: Meta<typeof IntervalItem> = {
    component: IntervalItem,
    title: 'Intervals/Interval Item',
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

export const Main: Story = {
    args: {
        id: '1',
        name: 'Interval Name',
        lastUsed: '02/02/2024',
        work: 30,
        rest: 10,
        rounds: 5,
        sets: 5,
        isNew: true,
        created: ''
    }
}