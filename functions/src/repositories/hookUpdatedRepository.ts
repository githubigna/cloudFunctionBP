
import { iwebHookRepository } from "../interfaces/webHookInterface";

export class hookUpdate {
    repository: iwebHookRepository;
    
    constructor(repository: iwebHookRepository) {
        this.repository = repository;
    }

    async execute() {

    }
}