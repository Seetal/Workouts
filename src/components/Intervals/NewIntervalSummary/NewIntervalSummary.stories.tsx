import type { Meta, StoryObj } from "@storybook/react";
import NewIntervalSummary from "./NewIntervalSummary";

const meta: Meta<typeof NewIntervalSummary> = {
    component: NewIntervalSummary,
    title: 'Intervals/New Interval Summary'
}

export default meta;

type Story = StoryObj<typeof meta>;

export const Main: Story = {
    args: {
        data: {
            name: '',
            work: '30',
            rest: '',
            rounds: '',
            sets: ''
        }
    }
}