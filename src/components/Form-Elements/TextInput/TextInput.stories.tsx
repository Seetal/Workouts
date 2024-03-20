import type { Meta, StoryObj } from "@storybook/react";
import TextInput from "./TextInput";

const meta: Meta<typeof TextInput> = {
    component: TextInput,
    title: 'Form Elements/Text Input'
}

export default meta;

type Story = StoryObj<typeof meta>;

export const Main: Story = {
    args: {
        label: 'Text Input Label',
        id: 'textInputId',
        name: 'textInput',
        newIntervalData: {
            isValidationVisible: true,
            validationText: 'Validation text',
            value: 'Sample text',
            valid: false
        }
    }
}