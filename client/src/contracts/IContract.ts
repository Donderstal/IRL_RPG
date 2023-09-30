import type { ContractType } from "../enumerables/ContractType";

export type IContract = {
    contractId: string;
    contractType: ContractType;
    attempts: number;
}