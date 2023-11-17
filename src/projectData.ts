import { Project } from "./types";
import { load } from "js-yaml";


export const projects: Project[] = [
  {
    id: 1,
    title: "Oasis Authenticator",
    description: "Oasis Authenticator is a login process for Web3 that verifies user identities with public keys instead of emails, text messages or other Web2 products.",
    tags: ["Sapphire", "OPL"],
  },
  {
    id: 2,
    title: "Oasis authzn-sdk library Demo",
    description: "Demo page, showcasing the authzn-sdk library",
    tags: ["Solidity", "Sapphire"],
  },
  {
    id: 3,  
    title: "Oasis Swag",
    description: "Spin the wheel and our Sapphire native RNG will determine which swag item you won.",
    tags: ["Rust", "Typescript"],
  },
  {
    id: 4,
    title: "Oasis Voting",
    description: "Create your new poll by filling out the fields below. Once created, your poll will be live immediately and responses will start being recorded.",
    tags: ["Sapphire", "OPL"],
  }
];



const yamls = import.meta.glob('./*.yaml', { as: 'raw', eager: true })

console.log(yamls)
const fromYaml = Object.values(yamls).map(yaml => load(yaml))

console.log(fromYaml)