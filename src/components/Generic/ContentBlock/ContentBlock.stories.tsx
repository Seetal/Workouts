import type { Meta, StoryObj } from "@storybook/react";
import ContentBlock from "./ContentBlock";

const meta: Meta<typeof ContentBlock> = {
    component: ContentBlock,
    title: 'Generic/Content Block'
}

export default meta;

type Story = StoryObj<typeof meta>;

export const Main: Story = {}