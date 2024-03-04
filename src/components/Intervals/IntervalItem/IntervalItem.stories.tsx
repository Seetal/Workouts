import type { Meta, StoryObj } from "@storybook/react";
import IntervalItem from "./IntervalItem";

const meta: Meta<typeof IntervalItem> = {
    component: IntervalItem,
    title: 'Intervals/Interval Item'
}

export default meta;

type Story = StoryObj<typeof meta>;

export const Main: Story = {
    args: {
        name: 'Interval Name',
        lastUsed: '02/02/2024',
        work: 30,
        rest: 10,
        rounds: 5,
        sets: 5
    }
}