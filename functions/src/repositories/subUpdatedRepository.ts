import { iuserRepository } from "../interfaces/userInterface";
import { iwebHookRepository } from "../interfaces/webHookInterface";
import { impRepository } from "../interfaces/mp.interface";

export class subscriptionUpdate {
    repository: iuserRepository;
    webhookRepository: iwebHookRepository;
    mpRepository: impRepository;

    constructor(repository: iuserRepository, webhookRepository: iwebHookRepository, mpRepository: impRepository) {
        this.repository = repository;
        this.webhookRepository = webhookRepository;
        this.mpRepository = mpRepository;
    }

    async executeUpdate() {

        let mpData = await this.mpRepository.get();

        let user = await this.repository.read(mpData.storeId)

        user.repository = this.webhookRepository;

        await user.update(mpData)

        this.repository.update(user);

    }
}