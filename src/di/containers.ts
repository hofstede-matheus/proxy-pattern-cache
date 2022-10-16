import { container } from 'tsyringe'
import { CatsController } from '../controllers/CatsController'
import { CatsRepository, CatsRepositoryToken } from '../domain/repositories/CatsRepository'
import { GetCatsUseCase } from '../interactors/GetCatsUseCase'
import { FileCatsRepository } from '../repositories/FileCatsRepository'
import { InMemmoryCatsRepository } from '../repositories/InMemmoryCatsRepository'

container.registerSingleton<CatsRepository>(CatsRepositoryToken, FileCatsRepository)
container.register(GetCatsUseCase, GetCatsUseCase)
container.register(CatsController, CatsController)