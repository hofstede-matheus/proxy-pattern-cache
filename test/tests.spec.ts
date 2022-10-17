import "reflect-metadata";
import '../src/di/test-container'
import { container } from 'tsyringe';
import { GetCatsUseCase } from '../src/interactors/GetCatsUseCase';

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('GetMeUsecase', () => {
  let useCase: GetCatsUseCase = container.resolve(GetCatsUseCase);

  it('should NOT get data from cache on first request', async () => {
    const result = await useCase.execute();

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toEqual([{ name: 'cat1', breedName: 'Persa' }, { name: 'cat2', breedName: 'Sphynx' }]);
  });

  it('should get data from cache when ttl is not exceded, even if data changes', async () => {
    // set to:
    // cat3 Persa
    // cat4 Sphynx
    container.registerInstance<string>(
      "catsFilename", "cats2.txt"
    )
    const result = await useCase.execute();

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toEqual([{ name: 'cat1', breedName: 'Persa' }, { name: 'cat2', breedName: 'Sphynx' }]);
  });

  it('should NOT get data from cache when ttl is exceded', async () => {
    await delay(2000);
    const result = await useCase.execute();

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toEqual([{ name: 'cat3', breedName: 'Persa' }, { name: 'cat4', breedName: 'Sphynx' }]);
  });

})