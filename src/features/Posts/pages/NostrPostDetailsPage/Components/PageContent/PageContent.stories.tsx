import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MOCK_DATA } from "src/mocks/data";

import PageContent from "./PageContent";

export default {
  title: "Posts/Post Details Page/Components/PageContent",
  component: PageContent,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof PageContent>;

const Template: ComponentStory<typeof PageContent> = (args) => (
  <div className="max-w-[890px]">
    <PageContent {...(args as any)}></PageContent>
  </div>
);

export const Story = Template.bind({});
Story.args = {};

export const Bounty = Template.bind({});
Bounty.args = {};

// export const Question = Template.bind({});
// Question.args = {
//     post: MOCK_DATA.posts.questions[0]
// }
