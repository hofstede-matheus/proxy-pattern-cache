import { container } from 'tsyringe'
import { CatsController } from '../controllers/CatsController'
import { Cat } from '../domain/entities/Cat'
import { Cacheable, generateProxeeToken } from '../domain/helpers'
import { CatsRepository, CatsRepositoryToken } from '../domain/repositories/CatsRepository'
import { GetCatsUseCase } from '../interactors/GetCatsUseCase'
import { CatsRepositoryProxy } from '../repositories/CatsRepositoryProxy'
import { FileCatsRepository } from '../repositories/FileCatsRepository'

container.registerInstance<string>(
  "catsFilename", "cats.txt"
)

container.registerSingleton<CatsRepository>(generateProxeeToken(CatsRepositoryToken), FileCatsRepository)
container.registerSingleton<CatsRepository>(CatsRepositoryToken, CatsRepositoryProxy)
container.registerInstance<Cacheable<Cat[], Date, number>>("getCats", { value: undefined, ttl: 2000, expiresAt: new Date() })

container.register(GetCatsUseCase, GetCatsUseCase)
container.register(CatsController, CatsController)