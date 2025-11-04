import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticleWithoutTitle } from '../../src/ui/actions/article/createNewArticle';
import { createNewArticleWithoutText } from '../../src/ui/actions/article/createNewArticle';
import { createNewArticleWithoutTags } from '../../src/ui/actions/article/createNewArticle';
import { createNewArticleWithoutDescription } from '../../src/ui/actions/article/createNewArticle';

let homePage;
let createArticlePage;
let article;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);
  article = generateNewArticleData(3);
  const user = generateNewUserData();

  await signUpUser(page, user);
});

test('Create an article without title', async ({ page }) => {
  await homePage.clickNewArticleLink();

  await createNewArticleWithoutTitle(page, article);
});

test('Create an article without description', async ({ page }) => {
  await homePage.clickNewArticleLink()

  await createNewArticleWithoutDescription(page, article);
});

test('Create an article without text', async ({ page }) => {
  await homePage.clickNewArticleLink()

  await createNewArticleWithoutText(page, article);
});

test('Create an article without tags', async ({ page }) => {
  await homePage.clickNewArticleLink()

  await createNewArticleWithoutTags(page, article);
})