import { CreateArticlePage } from "../../pages/article/CreateArticlePage";
import { ViewArticlePage } from "../../pages/article/ViewArticlePage";
import { DESCTIPTION_CANNOT_BE_EMPTY } from "../../constants/articleErrorMessages";
import { TITLE_CANNOT_BE_EMPTY } from "../../constants/articleErrorMessages";
import { TEXT_CANNOT_BE_EMPTY } from "../../constants/articleErrorMessages";
import { test } from '@playwright/test';

export async function createNewArticleWithRequiredFields(page, article) {
  await test.step(`Create a new article with required fields`, async () => {
    const createArticlePage = new CreateArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await createArticlePage.fillTitleField(article.title);
    await createArticlePage.fillDescriptionField(article.description);
    await createArticlePage.fillTextField(article.text);
    await createArticlePage.clickPublishArticleButton();
    
    await viewArticlePage.assertArticleTitleIsVisible(article.title);
    await viewArticlePage.assertArticleTextIsVisible(article.text);
  });
}

export async function createNewArticleWithoutTitle(page, article) {
  await test.step(`Create a new article without title`, async () => {
    const createArticlePage = new CreateArticlePage(page);

    await createArticlePage.fillDescriptionField(article.description);
    await createArticlePage.fillTextField(article.text);
    for (const tag of article.tags) {
      await createArticlePage.fillTagsField(tag);
    }
    await createArticlePage.clickPublishArticleButton();

    await createArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
  });
}

export async function createNewArticleWithoutDescription(page, article) {
  await test.step(`Create a new article without description`, async () => {
    const createArticlePage = new CreateArticlePage(page);

    await createArticlePage.fillTitleField(article.title);
    await createArticlePage.fillTextField(article.text);
    for (const tag of article.tags) {
      await createArticlePage.fillTagsField(tag);
    }
    await createArticlePage.clickPublishArticleButton();

    await createArticlePage.assertErrorMessageContainsText(DESCTIPTION_CANNOT_BE_EMPTY);
  });
}

export async function createNewArticleWithoutText(page, article) {
  await test.step(`Create a new article without text`, async () => {
    const createArticlePage = new CreateArticlePage(page);

    await createArticlePage.fillTitleField(article.title);
    await createArticlePage.fillDescriptionField(article.description);
    for (const tag of article.tags) {
      await createArticlePage.fillTagsField(tag);
    }
    await createArticlePage.clickPublishArticleButton();

    await createArticlePage.assertErrorMessageContainsText(TEXT_CANNOT_BE_EMPTY);
  });
}

export async function createNewArticleWithoutTags(page, article) {
  await test.step(`Create a new article without tags`, async () => {
    const createArticlePage = new CreateArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await createArticlePage.fillTitleField(article.title);
    await createArticlePage.fillDescriptionField(article.description);
    await createArticlePage.fillTextField(article.text);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertArticleTitleIsVisible(article.title);
    await viewArticlePage.assertArticleTextIsVisible(article.text);
  });
}

export async function createNewArticleWithAllFields(page, article) {
  await test.step(`Create a new article with all fields`, async () => {
    const createArticlePage = new CreateArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await createArticlePage.fillTitleField(article.title);
    await createArticlePage.fillDescriptionField(article.description);
    await createArticlePage.fillTextField(article.text);
    for (const tag of article.tags) {
      await createArticlePage.fillTagsField(tag);
    }
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertArticleTitleIsVisible(article.title);
    await viewArticlePage.assertArticleTextIsVisible(article.text);
  });
}