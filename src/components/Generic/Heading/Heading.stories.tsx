import type { Meta, StoryObj } from "@storybook/react";
import Heading from "./Heading";

const meta: Meta<typeof Heading> = {
    component: Heading,
    title: 'Generic/Heading'
}

export default meta;

type Story = StoryObj<typeof meta>;

export const Main: Story = {
    args: {
        title: 'Heading'
    }
}