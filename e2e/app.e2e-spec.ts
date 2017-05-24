import { FunkmapFrontPage } from './app.po';

describe('funkmap-front App', () => {
  let page: FunkmapFrontPage;

  beforeEach(() => {
    page = new FunkmapFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
