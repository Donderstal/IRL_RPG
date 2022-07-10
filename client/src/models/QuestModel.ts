export type QuestModel = {
    name: string;
    key: string;
    trigger: string;
    steps: { [key: string]: string };
    endTrigger: string;
}