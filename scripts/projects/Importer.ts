import {Project} from "../../src/types";

export interface Importer {
    importFromUrl(url: string): Promise<Project>;
}
