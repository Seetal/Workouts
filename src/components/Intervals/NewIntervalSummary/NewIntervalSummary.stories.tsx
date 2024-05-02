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
            name: {
                value: 'Name',
                valid: true,
                validationText: '',
                isValidationVisible: false
            },
            work: {
                value: '20',
                valid: true,
                validationText: '',
                isValidationVisible: false
            },
            rest: {
                value: '30',
                valid: true,
                validationText: '',
                isValidationVisible: false
            },
            rounds: {
                value: '5',
                valid: true,
                validationText: '',
                isValidationVisible: false
            },
            sets: {
                value: '5',
                valid: true,
                validationText: '',
                isValidationVisible: false
            }
        }
    }
}