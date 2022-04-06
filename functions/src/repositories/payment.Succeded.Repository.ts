import { iuserRepository } from "../interfaces/userInterface";

import { impRepository } from "../interfaces/mp.interface";

export class paymentSucceded {
    repository: iuserRepository;
    mpRepository: impRepository;

    constructor(repository: iuserRepository, mpRepository: impRepository) {
        this.repository = repository;
        this.mpRepository = mpRepository;
    }

    async executeUpdate() {

        let mpData = await this.mpRepository.getPayment();

        let user = await this.repository.read(mpData)

        await user.updatePayment()

        this.repository.update(user);

    }
}