/* eslint-disable prettier/prettier */
import { ICustomWorld } from '../support/custom-world';
import { config } from '../support/config';
import { Given, When, Then } from '@cucumber/cucumber';
import expect from 'expect';

Given('When I launch online shopping application', async function (this: ICustomWorld) {
  const page = this.page!;
  await page.goto(config.BASE_URL);
  await page
    .locator("//title[text()='TESTSCRIPTDEMO – Automation Practice']")
    .waitFor({ state: 'attached' });
});



When('I should select shopping page', async function (this: ICustomWorld) {
  const page = this.page!;
  await page.locator("//*[@id='menu-item-310']").click();
});


Given('I should select 4 product from shopping page', async function (this: ICustomWorld) {
  const page = this.page!;
  for (let i = 1; i <= 4; i++) {
    const PP = await page.locator("//ul[contains(@class,'products columns-4')][1]//li["+i+"]").first();
    await PP.click();
    await page
      .locator("//a[contains(@href,'?add_to_wishlist')]//span[text()='Add to wishlist']")
      .first()
      .click();
    await page.locator("//*[@id='menu-item-310']").first().click();
  }
});

When('I should view my wishlist table', async function (this: ICustomWorld) {
  const page = this.page!;
  await page.locator('.header-wishlist a >> nth=0').click();
});

let wishListCount = 0;
Then('I should get 4 selected items in my wishlist', async function (this: ICustomWorld) {
  const page = this.page!;
 wishListCount = await page.locator("//tbody[@class='wishlist-items-wrapper']//tr").count();
 console.log("wishListCount------",wishListCount);
  expect(wishListCount).toEqual(4);
});

const minValue: number[] = [];
let minIndex = 0;

When('I search for lowest price product from wishlisht', async function (this: ICustomWorld) {
  const page = this.page!;
  console.log('WishList Count %d', wishListCount);
  for (let i = 1; i <= wishListCount; i++) {
    const priceRange = await page
      .locator('//tr[' + i + "]//td[@class='product-price']")
      .innerText();
    // console.log(priceRange);
    if (priceRange.includes(' – ')) {
      const mnV = await page
        .locator('//tr[' + i + "]//td[@class='product-price']//span[1]//bdi")
        .innerText();
      minValue.push(Number(mnV.replace(/[^0-9.-]+/g, '')));
    } else {
      const mnV = await page
        .locator('//tr[' + i + "]//td[@class='product-price']/ins/span//bdi")
        .innerText();
      minValue.push(Number(mnV.replace(/[^0-9.-]+/g, '')));
    }
  }
  // console.log('minValue');
  // console.log(minValue);
  // console.log('maxValue');
  // console.log(maxValue);

  const minV = Math.min(...minValue);
  // console.log('miniValue');
  // console.log(minV);
  minIndex = minValue.indexOf(minV);
  // console.log('miniIndex');
  // console.log(minIndex);
});

When('I am able to add the lowest price item to my cart', async function (this: ICustomWorld) {
  const page = this.page!;
  minIndex = minIndex + 1;
  await page
    .locator(
      "//tbody[@class='wishlist-items-wrapper']//tr[" +
      minIndex +
      "]//td[@class='product-add-to-cart']//a",
    )
    .waitFor();
  await page
    .locator(
      "//tbody[@class='wishlist-items-wrapper']//tr[" +
      minIndex +
      "]//td[@class='product-add-to-cart']//a",
    )
    .scrollIntoViewIfNeeded();
  const cartLk = await page.locator(
    "//tbody[@class='wishlist-items-wrapper']//tr[" +
    minIndex +
    "]//td[@class='product-add-to-cart']//a",
  );
  await cartLk.hover();
  await cartLk.click();
});

Then('I am able to verify the item in my cart', async function (this: ICustomWorld) {
  const page = this.page!;
  const cartLink = await page.locator("//a[@title='Cart']//i").first();
  await cartLink.hover();
  await cartLink.click();
  const cartItemCount = await page
    .locator("//i[@class='la la-shopping-bag']//span")
    .first()
    .innerText();
  console.log('cartItemCount %d', cartItemCount);
  expect(cartItemCount).toEqual('1');
});
