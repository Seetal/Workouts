import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
    component: Button,
    title: 'Generic/Button',
    argTypes: {
        color: {
            control: { type: 'radio' },
            options: ['Red', 'Green', 'Blue', 'Orange']
        }
    }
}

export default meta;

type Story = StoryObj<typeof meta>;

export const Main: Story = {
    args: {
        color: 'Green',
        label: 'Button'
    }
}