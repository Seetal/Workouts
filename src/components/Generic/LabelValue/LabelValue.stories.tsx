import type { Meta, StoryObj } from "@storybook/react";
import LabelValue from "./LabelValue";

const meta: Meta<typeof LabelValue> = {
    component: LabelValue,
    title: 'Generic/Label Value',
    argTypes: {
        color: {
            control: { type: 'radio' },
            options: [ 'Red', 'Green', 'Blue', 'Orange' ]
        }
    } 
}

export default meta;

type Story = StoryObj<typeof meta>;

export const Main: Story = {
    args: {
        label: 'Label',
        value: 'Value',
        color: 'Green'
    }
};