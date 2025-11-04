import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticleWithAllFields } from '../../src/ui/actions/article/createNewArticle';
import { editArticleTags } from '../../src/ui/actions/article/editArticle';
import { removeArticleTags } from '../../src/ui/actions/article/editArticle';

let homePage;
let createArticlePage;
let viewArticlePage;
let articleNoTags;
let article;
let editedArticle;

test.beforeEach(async ({page}) => {
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);
  article = generateNewArticleData(1);
  editedArticle = generateNewArticleData(1);
  const user = generateNewUserData();

  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
  await createNewArticleWithAllFields(page, article);
  await viewArticlePage.clickEditArticleButton();
});

test(`Edit the article's tag where no tags`, async ({ page }) => {
  articleNoTags = generateNewArticleData();
  const user = generateNewUserData();

  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
  await createNewArticleWithAllFields(page, articleNoTags);
  await viewArticlePage.clickEditArticleButton();

  await editArticleTags(page, editedArticle)
});

test(`Edit the article's tag`, async ({ page }) => {
  await editArticleTags(page, editedArticle)
});

test(`Remove the article's tag`, async ({ page }) => {
  await removeArticleTags(page, article)
});