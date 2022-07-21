const {Builder, Capabilities, By} = require(`selenium-webdriver`);

require(`chromedriver`);

const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

beforeAll(async () => {
    await driver.get(`http://localhost:60630/movieList/index.html`)
});

afterAll(async () => {
    await driver.quit()
});

it(`adds the movie 'Star Wars'`, async () => {
    let inputBar = await driver.findElement(By.css("[placeholder='Add Movie']"))
    await inputBar.sendKeys(`Star Wars\n`)
    let buttonStarWars = await driver.findElement(By.id('StarWars'))
    expect(buttonStarWars).toBeTruthy
});

it(`adds and remove the movie 'Hot Fuzz'`, async () => {
    let inputBar = await driver.findElement(By.css("[placeholder='Add Movie']"))
    await inputBar.sendKeys(`Hot Fuzz\n`)
    let buttonHotFuzz = await driver.findElement(By.id('HotFuzz'))
    expect(buttonHotFuzz).toBeTruthy
    await buttonHotFuzz.click()
    expect(buttonHotFuzz).toBeFalsy
});

it(`adds and removes the movie 'Lord of the Rings', and checks if a message appears at the bottom of the list`, async () => {
    let inputBar = await driver.findElement(By.css("[placeholder='Add Movie']"))
    await inputBar.sendKeys(`Lord of the Rings\n`)
    let buttonLotR = await driver.findElement(By.id('LordoftheRings'))
    expect(buttonLotR).toBeTruthy
    await buttonLotR.click()
    let message = driver.findElement(By.css('#message'))
    expect(message.isDisplayed).toBeTruthy
    expect(buttonLotR).toBeFalsy
});