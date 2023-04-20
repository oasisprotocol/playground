export type Poll = {
  creator: string;
  name: string;
  description: string;
  choices: string[];
  options: {
    publishVotes: boolean;
  };
};
