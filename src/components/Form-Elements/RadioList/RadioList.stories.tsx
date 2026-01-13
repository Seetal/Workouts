import type { Meta, StoryObj } from "@storybook/react";
import RadioList from "./RadioList";

const meta: Meta<typeof RadioList> = {
    component: RadioList,
    title: 'Form Elements/Radio List'
}

export default meta;

type Story = StoryObj<typeof meta>;

export const Main: Story = {
    args: {
        legend: 'Radio List',
        name: 'work',
        newIntervalData: {
            value: '--',
            valid: false,
            validationText: 'Select work time',
            isValidationVisible: false
        }
    }
}