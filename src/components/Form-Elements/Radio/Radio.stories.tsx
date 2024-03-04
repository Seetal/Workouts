import type { Meta, StoryObj } from "@storybook/react"
import Radio from "./Radio"

const meta: Meta<typeof Radio> = {
    component: Radio,
    title: 'Form Elements/Radio'
}

export default meta;

type Story = StoryObj<typeof meta>;

export const Main: Story = {
    args: {
        label: 'Radio',
        id: 'test',
        name: 'test'
    }
}